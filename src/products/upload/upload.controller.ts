import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { diskStorage } from 'multer'
import { extname } from 'path'

@ApiTags('Upload Module')
@Controller('api/v1')
export class UploadController {
  @Post('upload')
  // @ApiConsumes('multipart/form-data')
  // @ApiImplicitFile({ name: 'file', required: true })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(
          _,
          file,
          callback,
        ) {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return callback(null, `${randomName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
