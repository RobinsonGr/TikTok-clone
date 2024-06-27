import { Injectable } from '@nestjs/common';
import { CreateGraphqltestInput } from './dto/create-graphqltest.input';
import { UpdateGraphqltestInput } from './dto/update-graphqltest.input';

@Injectable()
export class GraphqltestService {
  create(createGraphqltestInput: CreateGraphqltestInput) {
    return 'This action adds a new graphqltest';
  }

  findAll() {
    return `This action returns all graphqltest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} graphqltest`;
  }

  update(id: number, updateGraphqltestInput: UpdateGraphqltestInput) {
    return `This action updates a #${id} graphqltest`;
  }

  remove(id: number) {
    return `This action removes a #${id} graphqltest`;
  }
}
