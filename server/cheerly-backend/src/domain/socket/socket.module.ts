import { Module } from '@nestjs/common';
import { MyGateWay } from './socket';
//import { SocketClient } from './socket-client';

@Module({
  providers: [MyGateWay],
})
export class SocketModule {}
