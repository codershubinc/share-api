import { Injectable } from "@nestjs/common";
import DB from "./utils/docConf";


@Injectable()
export class DbService {
    async createDoc(
        name: string,
        type: string,
        userId: string,
        size: string,
        deviceInfo: string,
        docId: string
    ) {
        try {
            return DB.createDoc(
                name,
                type,
                userId,
                size,
                deviceInfo,
                docId
            )
        } catch (error) {
            throw error
        }
    }
    async getDoc(docId: string) {
        try {
            return DB.getDoc(docId)
        } catch (error) {
            throw error
        }
    }
}