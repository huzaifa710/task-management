import { MigrationInterface, QueryRunner } from "typeorm";

export class tasksmig1679034497781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE public.task (id uuid DEFAULT public.uuid_generate_v4() NOT NULL,title character varying NOT NULL,description character varying NOT NULL, status character varying NOT NULL,"userId" uuid);'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE public.task;')
  }
}
