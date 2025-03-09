import { Controller, Get, Post, Req } from "@nestjs/common";
import { DbService } from "./db.service";


@Controller('/appwrite/doc')
export class DBController {
    constructor(private readonly dbService: DbService) { }

    @Post("/create")
    async createDoc(
        @Req() req: any,
    ) {
        try {
            const {
                name,
                type,
                userId,
                size,
                deviceInfo,
                docId
            } = req.body

            return await this.dbService.createDoc(
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

    @Get("/get")
    async getDoc(
        @Req() req: any,
    ) {
        try {
            const { docId } = req.body
            return this.dbService.getDoc(docId)
        } catch (error) {
            console.log('error at get doc', error);

            throw error
        }
    }

    @Get("/get/q")
    async getDocQ(
        @Req() req: any
    ) {

        try {

            const { userId } = req.body
            return this.dbService.getDocQuery(userId)

        } catch (error) {
            console.log('error at get list odf doc', error);
            throw error

        }
    }
}