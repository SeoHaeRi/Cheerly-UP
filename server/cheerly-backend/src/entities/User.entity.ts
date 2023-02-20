import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Post } from './Post.entity';
import { Study } from './Study.entity';
import { Comment } from './Comment.entity';
import { Chat } from './Chat.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 50 })
  pw: string;

  @Column('varchar', { length: 128 })
  nickname: string;

  @Column({ type: 'date' })
  birthday: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('varchar', { length: 50 })
  job: string;

  @Column('varchar', { length: 45 })
  my_comment: string;

  @Column('varchar', { length: 100 })
  profile_img: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => Study, (study) => study.user, { cascade: true })
  studies: Study[];

  @OneToMany(() => Study, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Chat, (chat) => chat.user, { cascade: true })
  chats: Chat[];
}
