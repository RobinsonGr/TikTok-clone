import { Test, TestingModule } from '@nestjs/testing';
import { GraphqltestService } from './graphqltest.service';

describe('GraphqltestService', () => {
  let service: GraphqltestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqltestService],
    }).compile();

    service = module.get<GraphqltestService>(GraphqltestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
