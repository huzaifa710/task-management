import { MigrationInterface, QueryRunner } from "typeorm";

export class usersmig1679036918239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE public."user" (id uuid DEFAULT public.uuid_generate_v4() NOT NULL,username character varying NOT NULL,password character varying NOT NULL);'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE public.user;");
  }
}
