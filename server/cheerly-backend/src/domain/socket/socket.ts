import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

//cors - 설정
@WebSocketGateway({ cors: '*' })
export class MyGateWay implements OnModuleInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      // console.log(socket.id);
      console.log('Server Socket Connected');

      socket.emit('info', socket.id);
    });
  }
  public handleDisconnect(client: Socket) {
    console.log(`client disconnected ${client.id}`);
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }

  // @SubscribeMessage('room')
  // joinRoom(socket: Socket, roomId: string) {
  //   // socket.join(roomId);
  // }
}
