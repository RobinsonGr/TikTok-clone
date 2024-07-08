import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Person } from '@prisma/client';

interface ProfileUpdateData {
  fullname?: string;
  bio?: string;
  image?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(userId: number, profileData: ProfileUpdateData): Promise<Person> {
    return this.prisma.user.update({
      where: { id: userId },
      data: profileData,
    });
  }

  async fetchAllPersons(): Promise<Person[]> {
    return this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }
}