import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'Life' })
export class Life {
  @PrimaryGeneratedColumn('increment')
  life_id: number;

  @Column({ type: 'tinyint', default: 0, nullable: false })
  done: number;

  @CreateDateColumn({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => User, (user) => user.lives)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
