import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: AppModule.corsOrigin });
  await app.listen(AppModule.port);
  return AppModule.port;
}

bootstrap().then((port) => {
  Logger.log(`App listening on ${port}`);
});
