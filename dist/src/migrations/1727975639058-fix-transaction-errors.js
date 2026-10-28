"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixTransactionErrors1727975639058 = void 0;
class fixTransactionErrors1727975639058 {
    constructor() {
        this.name = 'fixTransactionErrors1727975639058';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`completed_at\` \`completed_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`canceled_at\` \`canceled_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`refunded_at\` \`refunded_at\` datetime NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`refunded_at\` \`refunded_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`canceled_at\` \`canceled_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` CHANGE \`completed_at\` \`completed_at\` datetime NOT NULL`);
    }
}
exports.fixTransactionErrors1727975639058 = fixTransactionErrors1727975639058;
//# sourceMappingURL=1727975639058-fix-transaction-errors.js.map