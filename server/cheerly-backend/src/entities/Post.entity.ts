import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  post_id: string;

  @Column('varchar', { length: 50 })
  user_id: string;

  @Column('varchar', { length: 128 })
  title: string;

  @Column({ type: 'date' })
  content: string;

  @Column({ type: 'date' })
  date: string;
}
