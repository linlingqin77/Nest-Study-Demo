import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_LOGGER_TOKEN } from './modules/winston/winston.module';
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get(WINSTON_LOGGER_TOKEN));
  await app.listen(3000);
}
bootstrap();
