// user.resolver.ts
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { SignInDto } from 'src/auth/dto/signin.dto';
import { GraphqlAuthGuard } from '../auth/graphql-auth/graphql-auth.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Response, Request } from 'express';
import { LoginResponse, RegisterResponse } from 'src/auth/types';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';
import { UserService } from './user.service';
import { User } from './user.model';
import { FileUploadService } from './file-upload.service';
import { ConfigService } from '@nestjs/config';

// This will handle all graphql operations, this file won't touch the db directly, that is person.service.ts for
@Resolver('User')
// This filter helps me convert exceptions to GraphQL errors, intially was ony needed to set it in signUp, but i decided to cover all
@UseFilters(GraphQLErrorFilter)
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
    private readonly configService: ConfigService,
  ) {}

  // This mutation handles user registration
  @Mutation(() => RegisterResponse)
  async signUp(
    @Args('signUpDto') signUpDto: SignUpDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    // I'm validating passwords here to catch mismatches early
     if (password !== confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and confirm password do not match.',
      });
    }
    
    try {
      const { user } = await this.authService.register(registerDto, context.res);
      return { user };
    } catch (error) {
      // If registration fails, I return an error message
      return { error: { message: error.message } };
    }
  }

  // This mutation handles user login
  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ): Promise<LoginResponse> {
    return this.authService.login(loginDto, context.res);
  }

  // This mutation handles user logout
  @Mutation(() => String)
  async logout(@Context() context: { res: Response }): Promise<string> {
    return this.authService.logout(context.res);
  }

  // This query is just a test to check if auth is working
  @UseGuards(GraphqlAuthGuard)
  @Query(() => String)
  getProtectedData(): string {
    return 'This is protected data';
  }

  // This mutation refreshes the user's token
  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }): Promise<string> {
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      // If token refresh fails, I throw a BadRequestException
      throw new BadRequestException(error.message);
    }
  }

  // This mutation updates the user's profile, including image upload
  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User)
  async updateUserProfile(
    @Context() context: { req: Request },
    @Args('fullname', { type: () => String, nullable: true }) fullname?: string,
    @Args('bio', { type: () => String, nullable: true }) bio?: string,
    @Args('image', { type: () => GraphQLUpload, nullable: true }) image?: GraphQLUpload,
  ): Promise<User> {
    // I'm using FileUploadService to handle image uploads
    const imageUrl = image ? await this.fileUploadService.uploadImage(image) : undefined;
    return this.userService.updateProfile(context.req.user.sub, { fullname, bio, image: imageUrl });
  }

  // This query fetches all users - might need pagination later
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}