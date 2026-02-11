import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGrantSubmissions1770730476476 implements MigrationInterface {
  name = 'AddGrantSubmissions1770730476476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."grant_submissions_state_enum" AS ENUM('approved', 'rejected')`,
    );
    await queryRunner.query(
      `CREATE TABLE "grant_submissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grant_id" uuid NOT NULL, "state" "public"."grant_submissions_state_enum" NOT NULL, "feedback" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_be7a38565d5635602b1576c155" UNIQUE ("grant_id"), CONSTRAINT "PK_dda4addb63c98ca9f63b00016ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "grant_submissions" ADD CONSTRAINT "FK_be7a38565d5635602b1576c155c" FOREIGN KEY ("grant_id") REFERENCES "grants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "grant_submissions" DROP CONSTRAINT "FK_be7a38565d5635602b1576c155c"`,
    );
    await queryRunner.query(`DROP TABLE "grant_submissions"`);
    await queryRunner.query(`DROP TYPE "public"."grant_submissions_state_enum"`);
  }
}
