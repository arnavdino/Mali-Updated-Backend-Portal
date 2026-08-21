import {MigrationInterface, QueryRunner} from "typeorm";

export class vendorChanges1719446760700 implements MigrationInterface {
    name = 'vendorChanges1719446760700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'inactive'`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`deleted_at\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`created_at\``);
    }

}
