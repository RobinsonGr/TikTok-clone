import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { FileUpload } from 'graphql-upload-ts';
import { mkdir } from 'fs/promises';

@Injectable()
export class FileUploadService {
  constructor(private configService: ConfigService) {}

  async uploadImage(file: FileUpload): Promise<string> {
    try {
      const { createReadStream, filename } = await file;

      const uniqueFilename = `${uuidv4()}_${filename}`;
      const publicDir = join(process.cwd(), 'public');
      await mkdir(publicDir, { recursive: true });
      const imagePath = join(publicDir, uniqueFilename);
      const imageUrl = `${this.configService.get('APP_URL')}/${uniqueFilename}`;

      await new Promise((resolve, reject) => {
        //graphql includes it when receives the file with the dependency graphupload, so isn;t needed to read and write it manually, just using that method with pipe
        createReadStream()
          .pipe(createWriteStream(imagePath))
          .on('finish', resolve)
          .on('error', reject);
      });

      return imageUrl;
    } catch (error) {
      console.error('File upload failed:', error);
      throw new Error('File upload failed');
    }
  }
}