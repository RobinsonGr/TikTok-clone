// file-upload.service.ts
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
  constructor(private configService: ConfigService) {}

  async uploadImage(file: GraphQLUpload): Promise<string> {
    const { createReadStream, filename } = await file;

    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', uniqueFilename);
    const imageUrl = `${this.configService.get('APP_URL')}/${uniqueFilename}`;

    await new Promise((resolve, reject) => {
      //graphql includes it when receives the file with the dependency graphupload, so isn;t needed to read and write it manually, just using that method with pipe
      createReadStream()
        .pipe(createWriteStream(imagePath))
        .on('finish', resolve)
        .on('error', reject);

    });

  
    return imageUrl;
  }
}