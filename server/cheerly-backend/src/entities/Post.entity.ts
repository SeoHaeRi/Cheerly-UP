import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'Post' })
export class Board {
  @PrimaryGeneratedColumn()
  post_id: number;

  // @Column({ unique: true })
  // user_id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}

// 'varchar', { length: 50 }
// nullable: true
//{ default: new Date() }
