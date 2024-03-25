import { BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; //10mb

export const convertS3Url = (key: string) => {
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazon.com/${key}`;
};

export enum FILE_PREFIX {
  CONSTRUCTION = 'constructions',
  BANNER = 'banners'
}

export const CustomFileInterceptor = (allowedTypes: string[]) =>
  FileInterceptor('file', {
    limits: { fileSize: MAX_FILE_SIZE, files: 1 },
    fileFilter: (req, file, cb) => {
      return allowedTypes.includes(file.mimetype)
        ? cb(null, true)
        : cb(new BadRequestException(`Unsupported ${file.mimetype}`), false);
    },
  });

  export const TYPES_IMAGE_ALLOWED = [
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ];
