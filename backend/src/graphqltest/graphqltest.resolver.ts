import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GraphqltestService } from './graphqltest.service';
import { Graphqltest } from './entities/graphqltest.entity';
import { CreateGraphqltestInput } from './dto/create-graphqltest.input';
import { UpdateGraphqltestInput } from './dto/update-graphqltest.input';

@Resolver(() => Graphqltest)
export class GraphqltestResolver {
  constructor(private readonly graphqltestService: GraphqltestService) {}

  @Mutation(() => Graphqltest)
  createGraphqltest(@Args('createGraphqltestInput') createGraphqltestInput: CreateGraphqltestInput) {
    return this.graphqltestService.create(createGraphqltestInput);
  }

  @Query(() => [Graphqltest], { name: 'graphqltest' })
  findAll() {
    return this.graphqltestService.findAll();
  }

  @Query(() => Graphqltest, { name: 'graphqltest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.graphqltestService.findOne(id);
  }

  @Mutation(() => Graphqltest)
  updateGraphqltest(@Args('updateGraphqltestInput') updateGraphqltestInput: UpdateGraphqltestInput) {
    return this.graphqltestService.update(updateGraphqltestInput.id, updateGraphqltestInput);
  }

  @Mutation(() => Graphqltest)
  removeGraphqltest(@Args('id', { type: () => Int }) id: number) {
    return this.graphqltestService.remove(id);
  }
}
