import {MigrationInterface, QueryRunner} from "typeorm";

export class vendorChanges21719447453696 implements MigrationInterface {
    name = 'vendorChanges21719447453696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`transport_contract\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`basic_services\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`seeds\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`fertilizer\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`herbicide\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`phystosanitary_product\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`plowing\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`semi\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`fertilizer_spreading\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`phyto_treatment\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`small_equipment\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`insurance\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` CHANGE \`organization\` \`organization\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` CHANGE \`method_of_payment\` \`method_of_payment\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` CHANGE \`method_of_delivery\` \`method_of_delivery\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` CHANGE \`method_of_supply\` \`method_of_supply\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` CHANGE \`method_of_supply\` \`method_of_supply\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` CHANGE \`method_of_delivery\` \`method_of_delivery\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` CHANGE \`method_of_payment\` \`method_of_payment\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` CHANGE \`organization\` \`organization\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`insurance\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`small_equipment\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`phyto_treatment\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`fertilizer_spreading\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`semi\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`plowing\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`phystosanitary_product\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`herbicide\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`fertilizer\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`seeds\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`basic_services\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`transport_contract\``);
    }

}
