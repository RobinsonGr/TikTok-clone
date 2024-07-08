import { ArgumentsHost, Catch, ExceptionFilter, BadRequestException } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Catch(BadRequestException)
export class GraphQLErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {

    const response = exception.getResponse();

    // if its an object, its will be related with auth and i'll give more information with the code
    if (typeof response === 'object') {
      throw new GraphQLError('Validation error', {
        extensions: {
          code: 'VALIDATION_ERROR',
          validationErrors: response
        }
      });
    } else {
      throw new GraphQLError('Bad Request', {
        extensions: {
          code: 'BAD_REQUEST'
        }
      });
}}}
