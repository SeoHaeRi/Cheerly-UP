import { Module } from '@nestjs/common';
import { LifeController } from './life.controller';
import { LifeService } from './life.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Life } from 'src/entities/Life.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Life])],
  controllers: [LifeController],
  providers: [LifeService],
})
export class LifeModule {}
