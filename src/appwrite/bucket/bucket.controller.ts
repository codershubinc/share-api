import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import BucketService from "./bucket.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('/v0.1/bucket')
export class BucketController {
    constructor(private bucketService: BucketService) { }

    @Post('/files/upload')
    @UseInterceptors(FileInterceptor('file'))

    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log('file is ', file.mimetype === 'image');
    }


}