"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexDeleted1718631362351 = void 0;
class indexDeleted1718631362351 {
    constructor() {
        this.name = 'indexDeleted1718631362351';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX \`IDX_b2a33d7f394763e171ef11acc5\` ON \`user\` (\`deleted\`)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_b2a33d7f394763e171ef11acc5\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9) NULL`);
    }
}
exports.indexDeleted1718631362351 = indexDeleted1718631362351;
//# sourceMappingURL=1718631362351-index-deleted.js.map