import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const isProd = process.env.NODE_ENV === 'production';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: isProd
    ? ['dist/**/*.entity.js']
    : ['src/**/*.entity.ts'],
  migrations: isProd
    ? ['dist/migrations/*.js']
    : ['src/migrations/*.ts'],

  synchronize: false,
});

export default dataSource;
