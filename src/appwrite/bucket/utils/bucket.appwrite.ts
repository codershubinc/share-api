import { Client, ID, Storage } from "node-appwrite"
import * as fs from "fs";
import * as dotenv from "dotenv";
import { promisify } from "util";
dotenv.config()

const bucketId = process.env.APPWRITE_BUCKET_ID
const readFileAsync = promisify(fs.readFile);

class bucket {
    client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_BUCKET_API_KEY)

    storage = new Storage(this.client)

    async uploadFile(file: any) {
        try {
            console.log("bucketId:", bucketId);
            console.log("File received:", file);

            // ✅ Ensure file properties are valid
            if (!file || !file.path || !file.originalname) {
                throw new Error("Invalid file upload request");
            }

            // ✅ Read file as Buffer (since Multer stored it on disk)
            const fileStream = fs.createReadStream(file.path);

            // ✅ Upload file to Appwrite
            const result = await this.storage.createFile(
                bucketId,
                ID.unique(),
                fileStream as any,
            );

            console.log("File uploaded:", result);
            return result;
        } catch (error) {
            console.error("Upload Error:", error);
            throw error;
        } finally {
            // ✅ Cleanup: Delete local file after upload
            if (file && file.path) {
                fs.unlink(file.path, (err) => {
                    if (err) console.error("Error deleting file:", err);
                    else console.log("Temporary file deleted:", file.path);
                });
            }
        }
    }

    async getFile(fileId: string) {
        try {
            return this.storage.getFileView(
                bucketId,
                fileId
            )
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    async getFileDownload(fileId: string) {
        try {
            return this.storage.getFileDownload(
                bucketId,
                fileId
            )
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    async deleteFile(fileId: string) {
        try {
            return this.storage.deleteFile(
                bucketId,
                fileId
            )
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    async listFiles() {
        try {
            return this.storage.listFiles(
                bucketId
            )
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    async getFilePreview(
        fileId: string,
        width: number,
        height: number,
    ) {
        try {
            return this.storage.getFilePreview(
                bucketId,
                fileId,
                width,
                height
            )
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }


}

const Bucket = new bucket()
export default Bucket