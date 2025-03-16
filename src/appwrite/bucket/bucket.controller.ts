import { Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import BucketService from "./bucket.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { unlink } from "fs/promises";
import UploadCloudinary from "src/cloudinary/utils/upload.cloudinary";
import Bucket from "./utils/bucket.appwrite";


@Controller('/v0.1/bucket')
export class BucketController {
    constructor(private bucketService: BucketService) { }

    @Post('/files/upload')
    @UseInterceptors(FileInterceptor('file'))

    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any
    ) {
        try {
            console.log('file is ', file);
            console.log('req body is ', req.body);
            const uploadFileResponse = await Bucket.uploadFile(file);
            console.log('uploadFileResponse', uploadFileResponse);

            const removeFile = await unlink(file.path);

            console.log('removeFile', removeFile);
            return uploadFileResponse;

        } catch (error) {

            const removeFile = await unlink(file.path);
            console.log('removeFile', removeFile);
            console.log('error at file upload controller', error)
            throw error;


        }
    }

    @Post('/files/wo')
    async upFi(
        @Req() req: any
    ) {
        // const { file } = req.file;
        console.log('file is ', req.file);
        console.log('req  is ', req);


    }
}

