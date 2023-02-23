import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Life } from 'src/entities/Life.entity';
import { Repository } from 'typeorm';
import { CreateLifeParams, UpdateLifeParams } from './utils/type';

@Injectable()
export class LifeService {
  constructor(
    @InjectRepository(Life) private lifeRepository: Repository<Life>,
  ) {}

  //GET - 전체 공부 데이터
  //   getLives() {
  //     const lives = this.lifeRepository.find();
  //     return lives;
  //   }

  //GET - 특정 라이프 데이터 가져오기 (userId + 날짜)
  async getLivesByUserId(userId: string) {
    const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간

    const koreatime = new Date(Date.now() + TIME_ZONE)
      .toISOString()
      .split('T')[0];

    // userId 일치 & 날짜 일치하는 데이터 가져오기
    const lifeDataByUser = await this.lifeRepository
      .createQueryBuilder('l')
      .select(['l.life_id', 'l.done', 'l.date', 'l.content', 'l.user_id'])
      .where('l.user_id = :user_id', {
        user_id: userId,
      })
      .andWhere('l.date = :date', {
        date: koreatime,
      })
      .getMany();

    console.log(lifeDataByUser);
    return lifeDataByUser;
  }

  //GET userId 일치 + done = 1
  async getLivesRecord(userId: string) {
    const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간

    const koreatime = new Date(Date.now() + TIME_ZONE)
      .toISOString()
      .split('T')[0];

    //userId 일치 + done
    const lifeRecord = await this.lifeRepository
      .createQueryBuilder('l')
      .select(['l.life_id', 'l.done', 'l.date', 'l.content', 'l.user_id'])
      .where('l.user_id = :user_id', {
        user_id: String(userId),
      })
      .andWhere('l.done = :done', {
        done: 1,
      })
      .getMany();

    console.log(lifeRecord);
    return lifeRecord;
  }

  //POST - 라이프 투두리스트 할 일 생성
  createLife(lifeDetails: CreateLifeParams) {
    const newLifeToDo = this.lifeRepository.create({
      ...lifeDetails,
      date: new Date(),
    });
    return this.lifeRepository.save(newLifeToDo);
  }

  //PATCH - 라이프 투두리스트 수정
  updateLife(
    userId: string,
    lifeId: number,
    updateLifeDetails: UpdateLifeParams,
  ) {
    return this.lifeRepository.update(
      { life_id: lifeId, user_id: userId },
      {
        ...updateLifeDetails,
        date: new Date(),
      },
    );
  }

  //DELETE - 투두 삭제
  deleteLife(userId: string, lifeId: number) {
    return this.lifeRepository.delete({ life_id: lifeId, user_id: userId });
  }
}
