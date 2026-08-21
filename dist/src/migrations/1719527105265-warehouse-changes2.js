"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehouseChanges21719527105265 = void 0;
class warehouseChanges21719527105265 {
    constructor() {
        this.name = 'warehouseChanges21719527105265';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`warehouse\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`promotion\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'active'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP FOREIGN KEY \`FK_d47aee94bfae8488588de98fae0\``);
        await queryRunner.query(`DROP INDEX \`REL_d47aee94bfae8488588de98fae\` ON \`vendor\``);
        await queryRunner.query(`ALTER TABLE \`promotion\` CHANGE \`status\` \`status\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL DEFAULT 'published'`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`region\` \`region\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`common\` \`common\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP INDEX \`IDX_d47aee94bfae8488588de98fae\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`warehouse_id\``);
        await queryRunner.query(`ALTER TABLE \`warehouse\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97bb3a124fc8c9afa05565c25a\` ON \`vendor\` (\`location_id\`)`);
    }
}
exports.warehouseChanges21719527105265 = warehouseChanges21719527105265;
//# sourceMappingURL=1719527105265-warehouse-changes2.js.map