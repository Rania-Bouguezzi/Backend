import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as session from 'express-session';


async function bootstrap() {
  dotenv.config();
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); 
  const config = new DocumentBuilder()
  .setTitle('REST API')
  .setDescription('REST API')
  .setVersion('1.0')
  //.addTag('api')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
  }),
);
  await app.listen(3000);
}
bootstrap();
