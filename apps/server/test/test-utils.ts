import { Test, TestingModule } from '@nestjs/testing';
import { TestDbSetup } from './test-db.setup';
import { AppModule } from '../src/app.module';

export async function createTestApp() {
  const testDbSetup = new TestDbSetup();
  const dbConfig = await testDbSetup.start();

  // Set environment variables for the app to pick up
  process.env.DB_HOST = dbConfig.host;
  process.env.DB_PORT = String(dbConfig.port);
  process.env.DB_USER = dbConfig.username;
  process.env.DB_PASSWORD = dbConfig.password;
  process.env.DB_NAME = typeof dbConfig.database === 'string' ? dbConfig.database : 'vee_test';

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return { app, testDbSetup };
}
