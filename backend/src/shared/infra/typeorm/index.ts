import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import 'reflect-metadata';

const isRunningLocalMigration =
  process.env.MIGRATION === 'TRUE' && process.env.ENVIRONMENT === 'local';

const dataSourceOptions: DataSourceOptions = {
  name: process.env.POSTGRES_DB_NAME,
  type: 'postgres',
  url: isRunningLocalMigration
    ? process.env.DATABASE_LOCAL_URL
    : process.env.DATABASE_URL,
  ssl:
    process.env.ENVIRONMENT === 'prod' ? { rejectUnauthorized: false } : false,
  entities: [`${__dirname}/../../../modules/**/infra/typeorm/models/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
};

export const AppDataSource = new DataSource(dataSourceOptions);
