import {
  Column,
  Entity,
  CreateDateColumn,
  OneToMany,
  PrimaryColumn,
  Unique,
  Index,
} from 'typeorm';
import { Post } from './Post.entity';

@Entity({ name: 'User' })
@Index(['id', 'nickname'], { unique: true })
export class User {
  @PrimaryColumn('varchar', { length: 50 })
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
}
