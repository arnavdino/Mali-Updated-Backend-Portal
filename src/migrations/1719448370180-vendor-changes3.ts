import {MigrationInterface, QueryRunner} from "typeorm";

export class vendorChanges31719448370180 implements MigrationInterface {
    name = 'vendorChanges31719448370180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`product_supplied\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`product_purchased\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`location_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD UNIQUE INDEX \`IDX_97bb3a124fc8c9afa05565c25a\` (\`location_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_97bb3a124fc8c9afa05565c25a\` ON \`vendor\` (\`location_id\`)`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD CONSTRAINT \`FK_97bb3a124fc8c9afa05565c25ad\` FOREIGN KEY (\`location_id\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP FOREIGN KEY \`FK_97bb3a124fc8c9afa05565c25ad\``);
        await queryRunner.query(`DROP INDEX \`REL_97bb3a124fc8c9afa05565c25a\` ON \`vendor\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP INDEX \`IDX_97bb3a124fc8c9afa05565c25a\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`location_id\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`product_purchased\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`product_supplied\``);
    }

}
