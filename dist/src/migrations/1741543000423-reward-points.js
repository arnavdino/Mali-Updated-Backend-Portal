"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardPoints1741543000423 = void 0;
class rewardPoints1741543000423 {
    constructor() {
        this.name = 'rewardPoints1741543000423';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reward_points\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`reward_ratio\` float NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`reward_ratio\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reward_points\``);
    }
}
exports.rewardPoints1741543000423 = rewardPoints1741543000423;
//# sourceMappingURL=1741543000423-reward-points.js.map