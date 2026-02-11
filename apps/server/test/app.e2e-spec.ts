import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestDbSetup } from './test-db.setup';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('App (e2e)', () => {
  let app: INestApplication;
  let testDbSetup: TestDbSetup;

  beforeAll(async () => {
    testDbSetup = new TestDbSetup();
    const dbConfig = await testDbSetup.start();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), AppModule],
    })
      .overrideModule(TypeOrmModule)
      .useModule(TypeOrmModule.forRoot(dbConfig))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 60000); // Higher timeout for container start

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (testDbSetup) {
      await testDbSetup.stop();
    }
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200).expect({
      status: 'ok',
      database: 'connected',
    });
  });
});
