import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  const corsOptions: CorsOptions = {
    origin: '*', // Allow requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);
  await app.listen(process.env.APP_PORT || 3001);

  Logger.log(`--- App is running on Port: ${process.env.APP_PORT || 3001} ---`);
}
bootstrap();
