import { Client, Databases, ID, Storage } from "node-appwrite"

const bucketId = process.env.APPWRITE_BUCKET_ID

class bucket {
    client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_DOC_API_KEY)
    storage = new Storage(this.client)

    async uploadFile(file: any) {
        try {
            return this.storage.createFile(
                bucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log('error', error)
            throw error
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