"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ageDefault1719437609659 = void 0;
class ageDefault1719437609659 {
    constructor() {
        this.name = 'ageDefault1719437609659';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NOT NULL`);
    }
}
exports.ageDefault1719437609659 = ageDefault1719437609659;
//# sourceMappingURL=1719437609659-age-default.js.map