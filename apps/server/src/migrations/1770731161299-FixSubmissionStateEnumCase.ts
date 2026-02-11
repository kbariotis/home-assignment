import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixSubmissionStateEnumCase1770731161299 implements MigrationInterface {
  name = 'FixSubmissionStateEnumCase1770731161299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."grant_submissions_state_enum" RENAME TO "grant_submissions_state_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."grant_submissions_state_enum" AS ENUM('APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "grant_submissions" ALTER COLUMN "state" TYPE "public"."grant_submissions_state_enum" USING "state"::"text"::"public"."grant_submissions_state_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."grant_submissions_state_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."grant_submissions_state_enum_old" AS ENUM('approved', 'rejected')`,
    );
    await queryRunner.query(
      `ALTER TABLE "grant_submissions" ALTER COLUMN "state" TYPE "public"."grant_submissions_state_enum_old" USING "state"::"text"::"public"."grant_submissions_state_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."grant_submissions_state_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."grant_submissions_state_enum_old" RENAME TO "grant_submissions_state_enum"`,
    );
  }
}
