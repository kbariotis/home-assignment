import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestDbSetup } from './test-db.setup';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Grants (e2e)', () => {
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
  }, 60000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (testDbSetup) {
      await testDbSetup.stop();
    }
  });

  it('grants (GraphQL Query)', async () => {
    const dataSource = testDbSetup.getDataSource();
    await dataSource.query(`
      INSERT INTO "grants" ("id", "provider_name", "grant_title", "deadline", "apply_url", "location", "areas", "amount", "sourced_date")
      VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Test Provider', 'Test Grant', NOW(), 'https://example.com', 'Test Location', ARRAY['test'], 1000, NOW())
    `);

    const query = `
      query {
        grants(skip: 0, take: 10) {
          id
          grantTitle
          providerName
        }
      }
    `;

    const response = await request(app.getHttpServer()).post('/graphql').send({ query });

    expect(response.status).toBe(200);
    expect(response.body.data.grants).toHaveLength(1);
    expect(response.body.data.grants[0].grantTitle).toBe('Test Grant');
  });
});
