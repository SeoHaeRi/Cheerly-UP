import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'Study' })
export class Study {
  @PrimaryGeneratedColumn('increment')
  study_id: number;

  // @Column({ unique: true })
  // user_id: string;

  @Column({ type: 'tinyint', default: 0, nullable: false })
  done: number;

  @CreateDateColumn({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
