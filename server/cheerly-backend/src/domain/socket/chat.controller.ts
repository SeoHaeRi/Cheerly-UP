import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Chat } from 'src/entities/Chat.entity';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post('/create')
  async createChat(@Body(ValidationPipe) chatData) {
    return await this.chatService.createChatRoom(chatData.roomName);
  }
  @Get('/list')
  async getList(): Promise<Chat[]> {
    const chatList = await this.chatService.getChatRoom();
    return chatList;
  }
}
