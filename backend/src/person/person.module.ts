import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import {FileUploadModule} from 'src/file-upload/file-upload.module'

@Module({
  imports: [PrismaModule, AuthModule, FileUploadModule],
  providers: [PersonResolver, PersonService],
})
export class PersonModule {}
