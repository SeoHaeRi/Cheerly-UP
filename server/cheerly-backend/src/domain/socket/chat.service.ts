import { Injectable } from '@nestjs/common';
import { Chat } from 'src/entities/Chat.entity';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  async createChatRoom(roomName: string): Promise<void> {
    return this.chatRepository.createChatRoom(roomName);
  }

  async getChatRoom(): Promise<Chat[]> {
    return await this.chatRepository.find();
  }
}
