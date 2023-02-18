import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Study } from 'src/entities/Study.entity';
import { Repository } from 'typeorm';
import { CreateStudyParams, UpdateStudyParams } from './utils/type';

@Injectable()
export class StudyService {
  constructor(
    @InjectRepository(Study) private studyRepository: Repository<Study>,
  ) {}

  //   //GET  - 전체 공부 데이터
  //   getStudies() {
  //     const studies = this.studyRepository.find();
  //     return studies;
  //   }

  //GET - 특정 스터디 데이터 가져오기(userId)
  //클라이언트에서 유저의 정보를 request해서 받아오는 것 설정해야함!!
  async getStudiesByUserId() {
    const studyDatabyUser = await this.studyRepository
      .createQueryBuilder('s')
      .select(['s.study_id', 's.done', 's.date', 's.content', 's.user_id'])
      .where('s.user_id = :user_id', {
        user_id: 'just',
      })
      .getMany();

    console.log(studyDatabyUser);
    return studyDatabyUser;
  }

  //GET - 날짜에 맞는 스터디 데이터 가져오기(Date)
  //날짜 클라이언트에서 보내주고 받아오고 수정해야함!
  async getStudiesByDate() {
    const studyDatabyDate = await this.studyRepository
      .createQueryBuilder('s')
      .select(['s.study_id', 's.done', 's.date', 's.content', 's.user_id'])
      .where('s.date = :date', {
        date: '2023-02-18',
      })
      .getMany();

    console.log(studyDatabyDate);
    return studyDatabyDate;
  }

  //POST - 스터디 할 일 생성 - user 데이터 받아와야함.
  createStudy(studyDetails: CreateStudyParams) {
    const newToDo = this.studyRepository.create({
      ...studyDetails,
      date: new Date(),
    });
    return this.studyRepository.save(newToDo);
  }

  //PATCH - 스터디 content, done, date 변경
  updateStudy(id: number, updateStudyDetails: UpdateStudyParams) {
    return this.studyRepository.update(
      { study_id: id },
      { ...updateStudyDetails, date: new Date() },
    );
  }

  //DELETE - 투두 삭제
  deleteStudy(id: number) {
    return this.studyRepository.delete({ study_id: id });
  }
}
