import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestDbSetup } from './test-db.setup';
import { createTestApp } from './test-utils';

describe('App (e2e)', () => {
  let app: INestApplication;
  let testDbSetup: TestDbSetup;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    testDbSetup = testApp.testDbSetup;
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
