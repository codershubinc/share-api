import { Controller } from "@nestjs/common";
import BucketService from "./bucket.service";


@Controller('/v0.1/buckets')
export class BucketController {
    constructor(private bucketService: BucketService) { }
}