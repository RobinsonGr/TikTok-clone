import { Resolver } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person as PersonModel } from './entities/PersonModel';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { Person } from '@prisma/client';
import { CreatePersonInput } from './dto/create-person.input';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Query(returns => [PersonModel])
  async person(): Promise<Person[]> {
    return this.personService.getUsers()
  }

  @Mutation(() => )

  @Mutation(returns => PersonModel) 
    async CreatePerson(@Args('data') data: CreatePersonInput): Promise<Person>{
      return this.personService.createPerson(data);
    };

};
