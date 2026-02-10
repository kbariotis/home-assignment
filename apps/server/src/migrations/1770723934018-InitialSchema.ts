import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1770723934018 implements MigrationInterface {
    name = 'InitialSchema1770723934018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "grants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider_name" character varying NOT NULL, "grant_title" character varying NOT NULL, "deadline" TIMESTAMP WITH TIME ZONE NOT NULL, "apply_url" character varying NOT NULL, "location" character varying NOT NULL, "areas" text array NOT NULL, "amount" numeric(12,2), "sourced_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a25f5f89eff8b3277f7969b7094" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "grants"`);
    }

}
