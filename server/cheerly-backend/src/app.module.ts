import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { ScrapperModule } from './scrapper/scrapper.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, ScrapperModule],
})
export class AppModule {}
