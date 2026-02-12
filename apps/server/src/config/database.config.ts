import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Grant } from '../grants/entities/grant.entity';
import { GrantSubmission } from '../grants/entities/grant-submission.entity';

config();

export const getDatabaseConfig = (): TypeOrmModuleOptions & DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'vee',
  entities: [Grant, GrantSubmission],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false, // Always false for production/migrations
  logging: true,
});

export const databaseConfig = getDatabaseConfig();

const dataSource = new DataSource(databaseConfig);
export default dataSource;
