import { MigrationInterface, QueryRunner } from "typeorm";

export class StandardizeDateTypes1770724188425 implements MigrationInterface {
    name = 'StandardizeDateTypes1770724188425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grants" DROP COLUMN "sourced_date"`);
        await queryRunner.query(`ALTER TABLE "grants" ADD "sourced_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grants" DROP COLUMN "sourced_date"`);
        await queryRunner.query(`ALTER TABLE "grants" ADD "sourced_date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
