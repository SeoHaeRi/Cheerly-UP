import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWD,
  database: process.env.DB_DATABASE,
  entities: ['/../**/*.entity.{js,ts}'],
  synchronize: true,
};
