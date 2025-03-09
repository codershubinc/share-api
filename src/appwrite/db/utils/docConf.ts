import { Client, Databases, ID, Query } from 'node-appwrite'
import * as dotenv from 'dotenv'
dotenv.config()

const dataBaseId = process.env.APPWRITE_DOC_DATABASE_ID
const collectionId = process.env.APPWRITE_DOC_COLLECTION_ID

class db {
    client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT)
        .setKey(process.env.APPWRITE_DOC_API_KEY)
    database = new Databases(this.client)

    async createDoc(
        name: string,
        type: string,
        userId: string,
        size: string,
        deviceInfo: string,
        docId: string
    ) {
        try {
            return this.database.createDocument(
                dataBaseId,
                collectionId,
                ID.unique(),
                {
                    name,
                    type,
                    userId,
                    size,
                    deviceInfo,
                    docId
                })
        } catch (error) {
            console.log('error at creating doc', error);
            throw error
        }
    }

    async getDoc(docId: string) {
        try {
            return this.database.getDocument(dataBaseId, collectionId, docId)
        } catch (error) {
            console.log('error at getting doc', error);
            throw error
        }
    }

    async listDocs(
        userId: string
    ) {
        try {
            return this.database.listDocuments(
                dataBaseId,
                collectionId,
                [
                    Query.equal('userId', userId),
                    Query.orderAsc('createdAt')
                ]
            )
        } catch (error) {
            console.log('error at listing docs', error);
            throw error
        }
    }
}

const DB = new db()
export default DB

