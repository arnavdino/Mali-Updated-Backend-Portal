import {MigrationInterface, QueryRunner} from "typeorm";

export class vendorWarehouse1719528862017 implements MigrationInterface {
    name = 'vendorWarehouse1719528862017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`warehouse_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD CONSTRAINT \`FK_d47aee94bfae8488588de98fae0\` FOREIGN KEY (\`warehouse_id\`) REFERENCES \`warehouse\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP FOREIGN KEY \`FK_d47aee94bfae8488588de98fae0\``);
        await queryRunner.query(`DROP INDEX \`REL_d47aee94bfae8488588de98fae\` ON \`vendor\``);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`region\` \`region\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`common\` \`common\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP INDEX \`IDX_d47aee94bfae8488588de98fae\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`warehouse_id\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97bb3a124fc8c9afa05565c25a\` ON \`vendor\` (\`location_id\`)`);
    }

}
