import {MigrationInterface, QueryRunner} from "typeorm";

export class newStuff1718572762731 implements MigrationInterface {
    name = 'newStuff1718572762731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`location\` DROP COLUMN \`zip\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`activities\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`literacy_level\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`other_products\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`other_products\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`other_products\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`other_products\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`literacy_level\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`actvities\``);
        await queryRunner.query(`ALTER TABLE \`location\` ADD \`zip\` varchar(255) NOT NULL`);
    }

}
