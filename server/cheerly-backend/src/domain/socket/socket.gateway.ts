import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
}) // namespace는 optional 입니다!
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // afterInit() {
  //   this.server.on('connection', (socket) => {
  //     console.log('Server: Socket Connected');
  //     socket.emit('info', socket.id);
  //   });
  // }

  // @SubscribeMessage('connection')
  // serverConnect(client: Socket) {
  //   // this.server.on('connection', (socket) => {
  //   console.log('Server: Socket Connected');
  //   this.server.emit('info', client.id);
  //   // });
  // }

  // onModuleInit() {
  //   this.server.on('connection', (socket) => {
  //     console.log('Server: Socket Connected');
  //     socket.emit('info', socket.id);
  //   });
  // }

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} 소켓 연결`);
    socket.emit('info', socket.id);
  }

  handleDisconnect(client: Socket) {
    console.log(client.id + ' server socket disconnected');
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload): void {
    console.log('msgToServer');

    this.server.emit('msgToClient', payload);
  }

  @SubscribeMessage('enterChatRoom')
  enterChatRoom(client: Socket, roomId: string) {
    client.join(roomId);
    client.to(roomId).emit('enterId', client.id);
  }
  //메시지가 전송되면 모든 유저에게 메시지 전송
  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, message: string): void {
    this.server.emit('getMessage', message);
  }
}
