import {MigrationInterface, QueryRunner} from "typeorm";

export class managerChanges1719586881094 implements MigrationInterface {
    name = 'managerChanges1719586881095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`update user set age = DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),dob)), '%Y') + 0`);
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP FOREIGN KEY \`FK_c23265fc818e27269da0bece503\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` CHANGE \`organization\` \`organization\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` CHANGE \`schooled\` \`schooled\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` CHANGE \`age\` \`age\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`region\` \`region\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`common\` \`common\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`warehouse_id\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`headquarters\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`deleted\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`image_url\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`password\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`email\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`external_id\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_2fab7864ff7c3c8443bd60fe1a\` ON \`warehouse_manager\` (\`email\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a93b1b83f4f78b99e9c41ac207\` ON \`warehouse_manager\` (\`external_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97bb3a124fc8c9afa05565c25a\` ON \`vendor\` (\`location_id\`)`);
    }

}
