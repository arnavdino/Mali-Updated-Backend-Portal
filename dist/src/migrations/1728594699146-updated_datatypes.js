"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedDatatypes1728594699146 = void 0;
class updatedDatatypes1728594699146 {
    constructor() {
        this.name = 'updatedDatatypes1728594699146';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`quantity\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`amount\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_1\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_1\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_2\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_2\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_3\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_3\` float NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_3\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_3\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_2\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_2\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`fee_1\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`fee_1\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`quantity\` int NOT NULL`);
    }
}
exports.updatedDatatypes1728594699146 = updatedDatatypes1728594699146;
//# sourceMappingURL=1728594699146-updated_datatypes.js.map