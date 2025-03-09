import { Module } from "@nestjs/common";
import { DBController } from "./db.controller";
import { DbService } from "./db.service";

@Module({
    imports: [],
    controllers: [DBController],
    providers: [DbService],
})
export class DBModule { }