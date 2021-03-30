import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3010;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4010,
    },
  });

  await app.startAllMicroservicesAsync();

  await app.listen(PORT, () =>
    Logger.log(`Application-User running on port ${PORT}`),
  );

  Logger.log('User microservice running');
}

bootstrap();
