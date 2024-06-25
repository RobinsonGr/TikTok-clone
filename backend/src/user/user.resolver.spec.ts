// user.resolver.ts
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RegisterDto, LoginDto } from '../auth/dto';
import { GraphqlAuthGuard } from '../auth/graphql-auth/graphql-auth.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Response, Request } from 'express';
import { LoginResponse, RegisterResponse } from 'src/auth/types';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.model';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as FileUpload from 'graphql-upload/graphqlUploadExpress.js';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseFilters(GraphQLErrorFilter)
  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and confirm password are not the same.',
      });
    }
    try {
      const { user } = await this.authService.register(
        registerDto,
        context.res,
      );
      console.log('user!', user);
      return { user };
    } catch (error) {
      return {
        error: {
          message: error.message,
        },
      };
    }
  }

  @Mutation(() => LoginResponse) // Adjust this return type as needed
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => String)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => String)
  getProtectedData() {
    return 'This is protected data';
  }

  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
