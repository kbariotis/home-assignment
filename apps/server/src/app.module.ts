import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { databaseConfig } from './config/database.config';
import { ApplicationErrorInterceptor } from './interceptors/application-error.interceptor';

import { GrantsModule } from './grants/grants.module';
import { HealthModule } from './health/health.module';
import { SCHEMA_PATH, DEFINITIONS_PATH } from 'graphql-server';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [SCHEMA_PATH],
      definitions:
        process.env.NODE_ENV !== 'production'
          ? {
              path: DEFINITIONS_PATH,
            }
          : undefined,
    }),

    GrantsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ApplicationErrorInterceptor,
    },
  ],
})
export class AppModule {}
