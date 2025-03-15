import { Injectable } from "@nestjs/common";
import Bucket from "./utils/bucket.appwrite";


@Injectable()
class BucketService {
    async uploadFile(
        file: any,
    ) {
        try {
            return await Bucket.uploadFile(file);
        } catch (error) {
            console.log('error', error)
            throw error;

        }
    }
    async getFileDownload(fileId: string) {
        try {
            return await Bucket.getFileDownload(fileId);
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    async deleteFile(fileId: string) {
        try {
            return await Bucket.deleteFile(fileId);
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    async listFiles() {
        try {
            return await Bucket.listFiles();
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    async getFilePreview(
        fileId: string,
        width: number,
        height: number,
    ) {
        try {
            return await Bucket.getFilePreview(fileId, width, height);
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }

}

export default BucketService;