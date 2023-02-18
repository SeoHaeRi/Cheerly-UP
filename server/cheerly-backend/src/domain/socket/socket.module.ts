import { Module } from '@nestjs/common';
import { MyGateWay } from './socket';
import { SocketClient } from './socket-client';

@Module({
  providers: [SocketClient, MyGateWay],
})
export class SocketModule {}
