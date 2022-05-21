import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import multer = require('multer');

@ApiTags('文件相关接口')
@Controller('file')
export class FileController {
  @ApiOperation({ summary: '文件上传' })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, join(process.cwd(), 'public'));
        },
        filename: function (req, file, cb) {
          const unique = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
          const imgPath = `${unique}.${file.mimetype.split('/')[1]}`;
          cb(null, imgPath);
        },
      }),
      limits: {
        fileSize: 1024 * 1024,
      },
      fileFilter(req, file, cb) {
        // if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        //   throw new ApiException(ApiErrCode.ARTICLE_EXIST);
        // }
        cb(null, true);
      },
    }),
  )
  async coverImport(@UploadedFile() file) {
    return {
      path: `/static/${file.filename}`,
    };
  }
}
