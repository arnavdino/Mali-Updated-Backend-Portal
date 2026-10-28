"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehouseChanges1719512254064 = void 0;
class warehouseChanges1719512254064 {
    constructor() {
        this.name = 'warehouseChanges1719512254064';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`other_income_activities\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`other_income_activities\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`facilitation_activity\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`facilitation_activity\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`other_suppliers\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`other_suppliers\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`infrastructure\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`infrastructure\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`logistics_and_production_means\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`logistics_and_production_means\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`other_products\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`other_products\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`other_agr\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`other_agr\` text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`other_agr\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`other_agr\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`other_products\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`other_products\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`logistics_and_production_means\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`logistics_and_production_means\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`infrastructure\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`infrastructure\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`other_suppliers\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`other_suppliers\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`facilitation_activity\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`facilitation_activity\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` DROP COLUMN \`other_income_activities\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_manager\` ADD \`other_income_activities\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promotion\` CHANGE \`status\` \`status\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL DEFAULT 'published'`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`region\` \`region\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`common\` \`common\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97bb3a124fc8c9afa05565c25a\` ON \`vendor\` (\`location_id\`)`);
    }
}
exports.warehouseChanges1719512254064 = warehouseChanges1719512254064;
//# sourceMappingURL=1719512254064-warehouse-changes.js.map