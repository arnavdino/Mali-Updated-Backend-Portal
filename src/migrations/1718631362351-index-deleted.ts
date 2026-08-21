import {MigrationInterface, QueryRunner} from "typeorm";

export class indexDeleted1718631362351 implements MigrationInterface {
    name = 'indexDeleted1718631362351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_b2a33d7f394763e171ef11acc5\` ON \`user\` (\`deleted\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b2a33d7f394763e171ef11acc5\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9) NULL`);
    }

}
