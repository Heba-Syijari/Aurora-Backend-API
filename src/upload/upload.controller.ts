import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UploadService } from './upload.service';

const MAX_FILE_SIZE_IN_BYTES = 1024 * 1024 * 2; // 2 MB

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @User('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: MAX_FILE_SIZE_IN_BYTES,
            message:
              'The uploaded image is too large. Maximum allowed size: 2MB',
          }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|svg|webp)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.uploadService.uploadImage(userId, image);
  }
  @Public()
  @Post('any-image')
  @UseInterceptors(FileInterceptor('image'))
  uploadAnyImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: MAX_FILE_SIZE_IN_BYTES,
            message:
              'The uploaded image is too large. Maximum allowed size: 2MB',
          }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|svg|webp)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Body('prefix') prefix: string,
  ) {
    return this.uploadService.uploadImage(prefix, image);
  }

  @Post('image-url')
  uploadImageFromURL(
    @User('id') userId: string,
    @Body('imageURL') imageURL: string,
  ) {
    return this.uploadService.uploadImageFromURL(userId, imageURL);
  }

  @Delete('image')
  deleteImage(@User('id') userId: string) {
    console.log({ userId });
    // return this.uploadService.deleteImage(
    //   userId,
    //   'images/19b1d55a-313f-4b01-be0c-555d9972ff33/2023-08/1691669987455.jpg',
    // );
  }

  @Public()
  @Post('ticket-attachment')
  @UseInterceptors(FileInterceptor('image'))
  uploadTicketAttachment(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_IN_BYTES }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|svg)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.uploadService.uploadImage('tickets', image);
  }
}
