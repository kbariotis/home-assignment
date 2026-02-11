import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { databaseConfig } from './config/database.config';
import { GrantsModule } from './grants/grants.module';
import { HealthModule } from './health/health.module';
import { SCHEMA_PATH, DEFINITIONS_PATH } from 'graphql-server/dist/node-constants';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [SCHEMA_PATH],
      definitions: {
        path: DEFINITIONS_PATH,
      },
    }),
    GrantsModule,
    HealthModule,
  ],
})
export class AppModule {}

