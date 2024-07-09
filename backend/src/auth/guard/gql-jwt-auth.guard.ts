import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { Request } from 'express';
  
  @Injectable()

  //using canActive interface for create guards
  export class GraphqlJwtGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      /* 
      EXAMPLE OF EXECUTIONCONTEXT 
      with qraphQL, the host object contains the [root, args, context, info]
      
      const argumenthost = {
        getType: () => 'http', // or 'graphql', 'rpc', etc.
        getArgs: () => [req, res, next], // For HTTP
        getArgByIndex: (index) => {  <============ we're using this
          const args = [req, res, next];
          return args[index];
        },
      }
  
      ExecutionContext extends argumentshost
      const executionContext = {
        ...argsHost, // Includes all methods from ArgumentsHost
        getClass: () => UserController,
        getHandler: () => getUserById,
        getType: () => 'http', // or 'graphql', 'rpc', etc.
      };
      */
  
      // We're using getArgByIndex(2) to get the GraphQL context
      // In GraphQL, the context is the 3rd argument (index 2) passed to resolvers
      const gqlCtx = context.getArgByIndex(2);
  
      /*
      Example of what gqlCtx might look like:
      const gqlCtx = {
        req: {
          // Express request object
          headers: {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          cookies: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          user: null, // This will be populated by the guard if authentication succeeds /request['user'] = payload;/
        },
        // ... other properties
      }
      */
      const request: Request = gqlCtx.req;
  
      // Get the token from the cookie, its being accessing to the cookies obj inside req
      const token = this.extractTokenFromCookie(request);
      if (!token) {
        throw new UnauthorizedException();
      }
  
      try {
        // Verify  token
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        });
  
        // If verification ok, attach the payload to the request object
        // This makes the user data available in the resolvers
        request['user'] = payload;

        //  payload jwt looks lie this
        /*       
        {
  "sub": "1234567890",  // subject (usually user ID)
  "name": "John Doe",   // user's name
  "email": "john@example.com",
  "role": "user",       // user's role (could be used for authorization)
  "iat": 1516239022,    // issued at (timestamp)
  "exp": 1516242622     // expiration time (timestamp)
}
        */
      } catch (error) {
        console.log(error);
        // If token verification fails (invalid, expired, etc.), throw UnauthorizedException
        throw new UnauthorizedException();
      }
  
      // by nestjs documentation canACtive must return either true or false, in that way to the guard to be able to pass or not
      return true;
    }
  
    // Helper method to get the token from cookies
    private extractTokenFromCookie(request: Request): string | undefined {
      // Use optional chaining in case cookies is undefined
      return request.cookies?.access_token;
    }
  }