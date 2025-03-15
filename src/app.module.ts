import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appwriteModules from './appwrite/index.module';

@Module({
  imports: [
    ...appwriteModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
