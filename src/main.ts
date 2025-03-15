import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // const configService = app.get(ConfigService);
  const port = 3000;

  app.useGlobalPipes(new ValidationPipe());
  console.log('port is running :', port);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
