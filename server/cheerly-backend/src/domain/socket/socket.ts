import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

// 소켓 아이디, 닉네임, date, 메시지
let list = {};

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
  public handleDisconnect(socket: Socket) {
    console.log(`client disconnected ${socket.id}`);
    // delete socket.id;
    socket.emit('info', `${socket.id}님이 퇴장하셨습니다.`);
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any, socket: Socket) {
    console.log(body);

    // return { event: 'newMessage', data: body };
    // this.server.emit('onMessage', {
    //   msg: 'New Message',
    //   content: body,
    // });
  }

  // @SubscribeMessage('join')
  // onNewMessage(@MessageBody() body: any) {
  //   console.log(body);
  // }
  // @SubscribeMessage('room')
  // joinRoom(socket: Socket, roomId: string) {}

  // afterInit(server: any) {
  //   this.server.on('create-room', (room)=> (
  //     console.log(`${room}이 생성되었습니다.`);
  //   ))}

  //   this.server.on('join-room', (room, id) => {
  //     console.log(`sockiet: ${id}님이 ${room}에 참여하였습니다.`);

  //   })

  //   this.server.on('leave-room')

 /*
 this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
*/
  // @SubscribeMessage('room')
  // joinRoom(socket: Socket, roomId: string) {
  //   // socket.join(roomId);
  // }
}
