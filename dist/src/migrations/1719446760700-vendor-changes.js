"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorChanges1719446760700 = void 0;
class vendorChanges1719446760700 {
    constructor() {
        this.name = 'vendorChanges1719446760700';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'inactive'`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`deleted_at\` datetime NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`created_at\``);
    }
}
exports.vendorChanges1719446760700 = vendorChanges1719446760700;
//# sourceMappingURL=1719446760700-vendor-changes.js.map