import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

config();

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'user-service',
      port: Number(process.env.CONNECTION_USER_SERVICE_PORT),
    },
  });

  await app.startAllMicroservicesAsync();

  await app.listen(process.env.USER_SERVICE_PORT);

  Logger.log('User microservice running');
}

bootstrap();
