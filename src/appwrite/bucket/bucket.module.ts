import { Injectable, Module } from "@nestjs/common";
import { BucketController } from "./bucket.controller";
import BucketService from "./bucket.service";
import { MulterModule } from "@nestjs/platform-express/multer";



@Module({
    imports: [],
    controllers: [BucketController],
    providers: [BucketService],
})




export class BucketModule { }