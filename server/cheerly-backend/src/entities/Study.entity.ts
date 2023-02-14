import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  pw: string;

  @Column()
  nickname: string;

  @Column({ type: 'date' })
  birthday: string;

  @Column({ type: 'date' })
  createdate: string;

  @Column()
  job: string;

  @Column()
  my_comment: string;

  @Column()
  profile_img: string;
}
