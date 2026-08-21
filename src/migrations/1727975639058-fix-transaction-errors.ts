import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTransactionErrors1727975639058 implements MigrationInterface {
    name = 'fixTransactionErrors1727975639058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`completed_at\` \`completed_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`canceled_at\` \`canceled_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`refunded_at\` \`refunded_at\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`refunded_at\` \`refunded_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`canceled_at\` \`canceled_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`completed_at\` \`completed_at\` datetime NOT NULL`);
    }

}
