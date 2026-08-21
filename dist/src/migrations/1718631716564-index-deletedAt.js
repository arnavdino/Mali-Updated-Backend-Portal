"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexDeletedAt1718631716564 = void 0;
class indexDeletedAt1718631716564 {
    constructor() {
        this.name = 'indexDeletedAt1718631716564';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_b2a33d7f394763e171ef11acc5\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deleted\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deleted_at\` datetime NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_22b81d3ed19a0bffcb660800f4\` ON \`user\` (\`deleted_at\`)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_22b81d3ed19a0bffcb660800f4\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`latitude\` \`latitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`longitude\` \`longitude\` decimal(20,9) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deleted\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE INDEX \`IDX_b2a33d7f394763e171ef11acc5\` ON \`user\` (\`deleted\`)`);
    }
}
exports.indexDeletedAt1718631716564 = indexDeletedAt1718631716564;
//# sourceMappingURL=1718631716564-index-deletedAt.js.map