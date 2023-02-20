import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';

@Entity({ name: 'Chat' })
export class Chat {
  @PrimaryGeneratedColumn('increment')
  chat_id: number;

  @Column({ nullable: false })
  msg: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  room_number: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
