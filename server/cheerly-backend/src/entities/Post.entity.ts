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

  // @Column({ unique: true })
  // user_id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}

//'varchar',{ length: 50 }
// nullable: true
//{ default: new Date() }
