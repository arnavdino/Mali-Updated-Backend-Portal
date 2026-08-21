import {MigrationInterface, QueryRunner} from "typeorm";

export class rewardPoints1741543000423 implements MigrationInterface {
    name = 'rewardPoints1741543000423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reward_points\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`reward_ratio\` float NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`reward_ratio\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reward_points\``);
    }
}
