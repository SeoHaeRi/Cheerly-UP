import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));

  // app.useStaticAssets(join(__dirname, '..', 'upload'));
  ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'upload') });

  const PORT = process.env.PORT || 3030;
  await app.listen(PORT, () => console.log(`Application running on`));

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
