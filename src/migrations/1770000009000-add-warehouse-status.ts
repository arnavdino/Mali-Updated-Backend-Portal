import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWarehouseStatus1770000009000 implements MigrationInterface {
  name = 'AddWarehouseStatus1770000009000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `warehouse` ADD `status` varchar(255) NOT NULL DEFAULT 'active'",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `warehouse` DROP COLUMN `status`');
  }
}
