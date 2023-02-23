import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Chat' })
export class Chat {
  @PrimaryGeneratedColumn('increment')
  chat_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column('varchar', { length: 50 })
  roomName: string;
}
