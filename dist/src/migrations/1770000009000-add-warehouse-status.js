"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWarehouseStatus1770000009000 = void 0;
class AddWarehouseStatus1770000009000 {
    constructor() {
        this.name = 'AddWarehouseStatus1770000009000';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `warehouse` ADD `status` varchar(255) NOT NULL DEFAULT 'active'");
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `warehouse` DROP COLUMN `status`');
    }
}
exports.AddWarehouseStatus1770000009000 = AddWarehouseStatus1770000009000;
//# sourceMappingURL=1770000009000-add-warehouse-status.js.map