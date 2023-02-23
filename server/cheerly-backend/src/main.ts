import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  const PORT = process.env.PORT || 3030;
  await app.listen(PORT, () =>
    console.log(`Application running on http://localhost:${PORT}`),
  );

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
