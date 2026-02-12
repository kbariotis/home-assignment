import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import { Grant } from '../src/grants/entities/grant.entity';
import { GrantSubmission } from '../src/grants/entities/grant-submission.entity';
import * as path from 'path';

export class TestDbSetup {
  private container!: StartedPostgreSqlContainer;
  private dataSource!: DataSource;

  async start() {
    this.container = await new PostgreSqlContainer('postgres:16-alpine')
      .withDatabase('vee_test')
      .withUsername('postgres')
      .withPassword('postgres')
      .start();

    const dbConfig = {
      type: 'postgres' as const,
      host: this.container.getHost(),
      port: this.container.getPort(),
      username: this.container.getUsername(),
      password: this.container.getPassword(),
      database: this.container.getDatabase(),
      entities: [Grant, GrantSubmission],
      migrations: [path.join(__dirname, '../src/migrations/*.ts')],
      logging: false,
    };

    this.dataSource = new DataSource(dbConfig);
    await this.dataSource.initialize();
    const migrations = await this.dataSource.runMigrations();
    console.log(`Executed ${migrations.length} migrations`);
    if (migrations.length === 0) {
      console.log('No migrations found at:', path.join(__dirname, '../src/migrations/*.ts'));
    }

    return dbConfig;
  }

  async stop() {
    if (this.dataSource) {
      await this.dataSource.destroy();
    }
    if (this.container) {
      await this.container.stop();
    }
  }

  getDataSource() {
    return this.dataSource;
  }
}
