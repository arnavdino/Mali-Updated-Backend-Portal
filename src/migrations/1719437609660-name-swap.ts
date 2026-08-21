import { MigrationInterface, QueryRunner } from 'typeorm';

export class ageDefault1719437609659 implements MigrationInterface {
  name = 'ageDefault1719437609660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE user SET fname=(@temp:=fname), fname = lname, lname = @temp`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NOT NULL`,
    );
  }
}
