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
export class Post {
  @PrimaryGeneratedColumn('increment')
  post_id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @CreateDateColumn({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}

//'varchar',{ length: 50 }
// nullable: true
//{ default: new Date() }
