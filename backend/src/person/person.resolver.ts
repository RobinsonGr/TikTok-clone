// user.resolver.ts
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { SignInDto } from 'src/auth/dto/signin.dto';
import { GraphqlJwtGuard } from 'src/auth/guard/gql-jwt-auth.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Response, Request } from 'express';
import { LoginResponse, RegisterResponse } from 'src/auth/types';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';
import { PersonService } from './person.service';
import { User } from './user.model';
import { FileUploadService } from './file-upload/file-upload.service';
import { ConfigService } from '@nestjs/config';



// This will handle all graphql operations, this file won't touch the db directly, that is person.service.ts for
@Resolver('User')
// This filter helps me convert exceptions to GraphQL errors, intially was ony needed to set it in signUp, but i decided to cover all
@UseFilters(GraphQLErrorFilter)
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly PersonService: PersonService,
    private readonly fileUploadService: FileUploadService,
    private readonly configService: ConfigService,
  ) {}

  // This mutation handles user registration
  @Mutation(() => RegisterResponse)
  async signUp(
    @Args('signUpInput') signUpDto: SignUpDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    // I'm validating passwords here to catch mismatches early
     if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and confirm password do not match.',
      });
    }
    
    try {
      const { person } = await this.authService.signUp(signUpDto, context.res);
      return { person };
    } catch (error) {
      // If registration fails, I'll return an error message
      return { error: { message: error.message } };
    }
  }

  // This mutation handles user singIn
  @Mutation(() => LoginResponse)
  async signIn(
    @Args('signInInput') signInDto: SignInDto,
    @Context() context: { res: Response },
  ): Promise<LoginResponse> {
    return this.authService.logIn(signInDto, context.res);
  }

  // This one handles user logout
  @Mutation(() => String)
  async logout(@Context() context: { res: Response }): Promise<string> {
    return this.authService.logout(context.res);
  }

  // accessingtoProtectData
  @UseGuards(GraphqlJwtGuard)
  @Query(() => String)
  accessAuthData(): string {
    return 'sensible data';
  }

  // This mutation refreshes the user's token
  //it'll renew the token after access token's time is up
  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }): Promise<string> {
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // This mutation updates the user's profile, including image upload, it needs auth guard
  @UseGuards(GraphqlJwtGuard)
  @Mutation(() => User)
  async updateUserProfile(
    @Context() context: { req: Request },
    //we'll receive data from client, so it needs to make sure to math the schema using args strings
    @Args('name', { type: () => String, nullable: true }) name?: string,
    @Args('biography', { type: () => String, nullable: true }) biography?: string,
    @Args('avatar', { type: () => GraphQLUpload, nullable: true }) avatar?: GraphQLUpload,
  ): Promise<User> {
    // I'm using FileUploadService to handle image uploads
    const imageUrl = avatar ? await this.fileUploadService.uploadImage(avatar) : undefined;
    return this.PersonService.updateProfile(context.req.person.sub, { fullname, bio, image: imageUrl });
  }

  // This query fetches all users - might need pagination later
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.PersonService.getUsers();
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User)
  async updateUserProfile(
    @Context() context: { req: Request },
    @Args('fullname', { type: () => String, nullable: true }) fullname?: string,
    @Args('bio', { type: () => String, nullable: true }) bio?: string,
    @Args('image', { type: () => GraphQLUpload, nullable: true }) image?: GraphQLUpload,
  ): Promise<User> {
    const imageUrl = image ? await this.fileUploadService.uploadImage(image) : undefined;
    return this.userService.updateProfile(context.req.user.sub, { fullname, bio, image: imageUrl });
  }


  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  private validatePasswords(password: string, confirmPassword: string): void {
    if (password !== confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and confirm password do not match.',
      });
    }
  }


  
}