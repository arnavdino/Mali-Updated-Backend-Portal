import { MigrationInterface, QueryRunner } from 'typeorm';

export class locationNames1719435667192 implements MigrationInterface {
  name = 'locationNames1719435667192';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`location\` CHANGE \`street\`  \`circle\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`location\` CHANGE \`community\`  \`common\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`location\` CHANGE \`city\`  \`village\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`location\` CHANGE \`state\`  \`region\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`location\` DROP COLUMN \`region\``);
    await queryRunner.query(`ALTER TABLE \`location\` DROP COLUMN \`village\``);
    await queryRunner.query(`ALTER TABLE \`location\` DROP COLUMN \`common\``);
    await queryRunner.query(`ALTER TABLE \`location\` DROP COLUMN \`circle\``);
    await queryRunner.query(
      `ALTER TABLE \`location\` ADD \`state\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`location\` ADD \`city\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`location\` ADD \`community\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`location\` ADD \`street\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`,
    );
  }
}
