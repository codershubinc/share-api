import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();


const allowedOrigins = [
  'http://localhost:3000',
  'https://chat-codershubinc.vercel.app',
  'https://share-codershubinc.vercel.app',
  'https://open-api-docs-two.vercel.app'
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS with dynamic origin validation
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });

  const port = process.env.PORT || 3001; // Use environment variable for the port
  await app.listen(port);

  const appUrl = await app.getUrl();
  console.log(`🚀 Application is running on: ${appUrl}`);
}

bootstrap();