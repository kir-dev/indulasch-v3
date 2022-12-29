import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(AppModule.port);
  return AppModule.port;
}

bootstrap().then((port) => {
  console.info('App listening on ' + port);
});
