import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './domain/socket/socket-io.adapters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.useWebSocketAdapter(new IoAdapter(app));
  const PORT = process.env.PORT || 3030;
  await app.listen(PORT, () =>
    console.log(`Application running on http://localhost:${PORT}`),
  );
}
bootstrap();
