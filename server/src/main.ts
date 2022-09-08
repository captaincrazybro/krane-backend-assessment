import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { AppModule } from './app.module';
import addUsersIfNotExist from './app.demo-users';

const PORT = 7777;

async function bootstrap() {
  addUsersIfNotExist();

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log('listening on', PORT);
}
bootstrap();
