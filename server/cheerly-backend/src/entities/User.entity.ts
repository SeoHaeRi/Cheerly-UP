import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('varchar', { length: 50 })
  id: string;

  @Column('varchar', { length: 50 })
  pw: string;

  @Column('varchar', { length: 128 })
  nickname: string;

  @Column({ type: 'date' })
  birthday: string;

  @Column({ type: 'date' })
  createdate: string;

  @Column('varchar', { length: 50 })
  job: string;

  @Column('varchar', { length: 45 })
  my_comment: string;

  @Column('varchar', { length: 100 })
  profile_img: string;
}
