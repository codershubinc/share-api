import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from 'dotenv';
dotenv.config();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

class uploadCloudinary {



    async upload(file: any) {
        try {
            const result = await cloudinary.uploader.upload(
                file.path
            )
            return result;

        } catch (error) {
            console.log('cloudinary upload error', error)
            throw error;

        }
    }
}

const UploadCloudinary = new uploadCloudinary();
export default UploadCloudinary;