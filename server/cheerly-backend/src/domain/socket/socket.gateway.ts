import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    credentials: true,
    origin: [process.env.CLIENT_HOST],
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`${client.id} 소켓 연결`);
  }

  handleDisconnect(client: Socket) {
    console.log(client.id + ' server socket disconnected');
  }

  // 채팅방 생성
  @SubscribeMessage('join')
  enterChatRoom(client: Socket, payload) {
    const roomname = payload.room.name;
    client.join(roomname);
    this.server.to(roomname).emit('info', payload.user);
  }

  // 채팅방 안에 사람에게 메시지 보내기
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload): void {
    const rooms = client.rooms;
    const roomArray = Array.from(rooms);
    console.log(roomArray[roomArray.length - 1]);
    this.server
      .to(roomArray[roomArray.length - 1])
      .emit('msgToClient', payload);
  }
}
