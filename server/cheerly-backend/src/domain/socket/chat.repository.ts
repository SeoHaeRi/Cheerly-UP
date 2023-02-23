import { ConflictException, Injectable } from '@nestjs/common';
import { Chat } from 'src/entities/Chat.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ChatRepository extends Repository<Chat> {
  constructor(private dataSource: DataSource) {
    super(Chat, dataSource.createEntityManager());
  }

  async createChatRoom(roomName: string): Promise<void> {
    const isExist = await this.findOneBy({ roomName: roomName });
    if (!isExist) {
      const chat = this.create({ roomName });
      await this.save(chat);
    } else {
      throw new ConflictException('존재하는 채팅방 이름입니다');
    }
  }
}
