import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAmountTypeToBigInt1770724259409 implements MigrationInterface {
  name = 'ChangeAmountTypeToBigInt1770724259409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "grants" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "grants" ADD "amount" bigint`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "grants" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "grants" ADD "amount" numeric(12,2)`);
  }
}
