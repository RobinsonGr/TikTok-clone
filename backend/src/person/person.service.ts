import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Person } from '@prisma/client';


//at the moment of send the schema from the client, it's needed to include this properties
interface ProfileUpdateData {
  name?: string;
  biography?: string;
  avatar?: string;
}

//this is will handle all operations with the db thoughtout prisma, person resolver instead will handle the graphql operations
@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(personId: number, profileData: ProfileUpdateData): Promise<Person> {
    return this.prisma.person.update({
      where: { id: personId },
      data: profileData,
    });
  }

  async fetchAllPersons(): Promise<Person[]> {
    return this.prisma.person.findMany({
      include: {
        posts: true,
      },
    });
  }
}