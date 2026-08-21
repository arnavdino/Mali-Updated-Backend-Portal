import {MigrationInterface, QueryRunner} from "typeorm";

export class rp1741544716593 implements MigrationInterface {
    name = 'rp1741544716593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`reward_points\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`reward_points\``);
    }

}
