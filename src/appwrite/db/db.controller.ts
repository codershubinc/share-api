import { Controller, Get, Post, Req } from "@nestjs/common";
import { DbService } from "./db.service";


@Controller()
export class DBController {
    constructor(private readonly dbService: DbService) { }

    @Post("/createDoc")
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

    @Get("/getDoc")
    async getDoc(
        @Req() req: any,
    ) {
        try {
            const { docId } = req.query
            return this.dbService.getDoc(docId)
        } catch (error) {
            throw error
        }
    }
}