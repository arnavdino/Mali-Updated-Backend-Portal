"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorWarehouse1719528862017 = void 0;
class vendorWarehouse1719528862017 {
    constructor() {
        this.name = 'vendorWarehouse1719528862017';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`warehouse_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD CONSTRAINT \`FK_d47aee94bfae8488588de98fae0\` FOREIGN KEY (\`warehouse_id\`) REFERENCES \`warehouse\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP FOREIGN KEY \`FK_d47aee94bfae8488588de98fae0\``);
        await queryRunner.query(`DROP INDEX \`REL_d47aee94bfae8488588de98fae\` ON \`vendor\``);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`region\` \`region\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`common\` \`common\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP INDEX \`IDX_d47aee94bfae8488588de98fae\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`warehouse_id\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97bb3a124fc8c9afa05565c25a\` ON \`vendor\` (\`location_id\`)`);
    }
}
exports.vendorWarehouse1719528862017 = vendorWarehouse1719528862017;
//# sourceMappingURL=1719528862017-vendor-warehouse.js.map