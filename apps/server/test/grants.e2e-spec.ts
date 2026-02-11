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

  it('submissions ordering (GraphQL Query)', async () => {
    const dataSource = testDbSetup.getDataSource();

    // Clean up from previous test
    await dataSource.query('DELETE FROM "grant_submissions"');
    await dataSource.query('DELETE FROM "grants"');

    // Create two grants and submissions
    await dataSource.query(`
      INSERT INTO "grants" ("id", "provider_name", "grant_title", "deadline", "apply_url", "location", "areas", "amount", "sourced_date")
      VALUES 
        ('11111111-1111-1111-1111-111111111111', 'B Provider', 'G1', NOW(), 'url1', 'loc1', ARRAY['a1'], 100, NOW()),
        ('22222222-2222-2222-2222-222222222222', 'A Provider', 'G2', NOW(), 'url2', 'loc2', ARRAY['a2'], 200, NOW())
    `);

    await dataSource.query(`
      INSERT INTO "grant_submissions" ("id", "grant_id", "state", "created_at")
      VALUES 
        ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'APPROVED', NOW()),
        ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'APPROVED', NOW())
    `);

    const query = `
      query GetSubmissions($orderBy: SubmissionOrderBy, $orderDir: OrderDirection) {
        submissions(orderBy: $orderBy, orderDir: $orderDir) {
          id
          grant {
            providerName
          }
        }
      }
    `;

    // Test sort by PROVIDER_NAME ASC
    const respAsc = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query, variables: { orderBy: 'PROVIDER_NAME', orderDir: 'ASC' } });

    expect(respAsc.status).toBe(200);
    expect(respAsc.body.data.submissions[0].grant.providerName).toBe('A Provider');
    expect(respAsc.body.data.submissions[1].grant.providerName).toBe('B Provider');

    // Test sort by PROVIDER_NAME DESC
    const respDesc = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query, variables: { orderBy: 'PROVIDER_NAME', orderDir: 'DESC' } });

    expect(respDesc.status).toBe(200);
    expect(respDesc.body.data.submissions[0].grant.providerName).toBe('B Provider');
    expect(respDesc.body.data.submissions[1].grant.providerName).toBe('A Provider');
  });
});
