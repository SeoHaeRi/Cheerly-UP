import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Board } from './Post.entity';

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

  @OneToMany(() => Board, (post) => post.user)
  posts: Board[];
}
