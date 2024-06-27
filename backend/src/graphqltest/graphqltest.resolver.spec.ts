import { Test, TestingModule } from '@nestjs/testing';
import { GraphqltestResolver } from './graphqltest.resolver';
import { GraphqltestService } from './graphqltest.service';

describe('GraphqltestResolver', () => {
  let resolver: GraphqltestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqltestResolver, GraphqltestService],
    }).compile();

    resolver = module.get<GraphqltestResolver>(GraphqltestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
