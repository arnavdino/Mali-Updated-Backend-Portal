import { MigrationInterface, QueryRunner } from 'typeorm';

export class newStuff21718573468415 implements MigrationInterface {
  name = 'newStuff21718573468415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`other_products\` \`other_products\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`live_stock_farming\` \`live_stock_farming\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`small_trade\` \`small_trade\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`means_of_production\` \`means_of_production\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`means_of_transport\` \`means_of_transport\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`financial_education\` \`financial_education\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`access_to_credit\` \`access_to_credit\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`access_to_insurance\` \`access_to_insurance\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`access_to_gap\` \`access_to_gap\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`total_area\` \`total_area\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`total_used_area\` \`total_used_area\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`cultivated_area\` \`cultivated_area\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`actual_area\` \`actual_area\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`property_status\` \`property_status\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`forcasted_surface_area\` \`forcasted_surface_area\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`authorized_surface_area\` \`authorized_surface_area\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
        `ALTER TABLE \`user\` CHANGE \`organization\` \`organization\` varchar(255) NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE \`user\` CHANGE \`profession\` \`profession\` varchar(255) NULL`,
      );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`literacy_level\` \`literacy_level\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9)`,
    );
    await queryRunner.query(
        `ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9)`,
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`literacy_level\` \`literacy_level\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`authorized_surface_area\` \`authorized_surface_area\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`forcasted_surface_area\` \`forcasted_surface_area\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`property_status\` \`property_status\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`actual_area\` \`actual_area\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`cultivated_area\` \`cultivated_area\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`total_used_area\` \`total_used_area\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`total_area\` \`total_area\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`access_to_gap\` \`access_to_gap\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`access_to_insurance\` \`access_to_insurance\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`access_to_credit\` \`access_to_credit\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`financial_education\` \`financial_education\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`means_of_transport\` \`means_of_transport\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`means_of_production\` \`means_of_production\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`small_trade\` \`small_trade\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`live_stock_farming\` \`live_stock_farming\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`other_products\` \`other_products\` varchar(255) NOT NULL`,
    );
  }
}
