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

@Entity({ name: 'Comment' })
export class Comment {
  @PrimaryGeneratedColumn('increment')
  comment_id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  post_id: number;

  @Column({ nullable: false })
  nickname: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToOne(() => Post, (post) => post.comment)
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'post_id' }])
  post: Post;
}
