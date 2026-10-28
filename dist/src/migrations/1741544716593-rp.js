"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rp1741544716593 = void 0;
class rp1741544716593 {
    constructor() {
        this.name = 'rp1741544716593';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`reward_points\` int NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`reward_points\``);
    }
}
exports.rp1741544716593 = rp1741544716593;
//# sourceMappingURL=1741544716593-rp.js.map