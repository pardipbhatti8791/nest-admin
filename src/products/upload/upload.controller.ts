import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post, Get, Param, Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { Response } from 'express'

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
    return {
      url: `http://localhost:8000/api/${file.path}`
    }
  }

  @Get('uploads/:path')
  async getImage(@Param('path') path, @Res() res: Response) {
    res.sendFile(path, { root: 'uploads' })
  }
}
