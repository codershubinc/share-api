import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                }
            })
        })
    ],
    exports: [MulterModule]
})
export class UploadConfigModule { }
