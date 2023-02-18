import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from 'src/entities/Study.entity';
import { StudyController } from './study.controller';
import { StudyService } from './study.service';

@Module({
  imports: [TypeOrmModule.forFeature([Study])],
  controllers: [StudyController],
  providers: [StudyService],
})
export class StudyModule {}
