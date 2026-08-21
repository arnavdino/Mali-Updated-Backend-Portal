import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedDatatypes1728594699146 implements MigrationInterface {
    name = 'updatedDatatypes1728594699146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`quantity\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`amount\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_1\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_1\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_2\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_2\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_3\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_3\` float NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_3\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_3\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_2\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_2\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_1\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_1\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`quantity\` int NOT NULL`);
    }

}
