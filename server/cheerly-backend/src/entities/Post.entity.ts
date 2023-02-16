import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './Study.entity';

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
}

// 'varchar', { length: 50 }
// nullable: true
//{ default: new Date() }
