"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newStuff1718572762731 = void 0;
class newStuff1718572762731 {
    constructor() {
        this.name = 'newStuff1718572762731';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`location\` DROP COLUMN \`zip\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`activities\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`literacy_level\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`other_products\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`other_products\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`other_products\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`other_products\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`literacy_level\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`actvities\``);
        await queryRunner.query(`ALTER TABLE \`location\` ADD \`zip\` varchar(255) NOT NULL`);
    }
}
exports.newStuff1718572762731 = newStuff1718572762731;
//# sourceMappingURL=1718572762731-new-stuff.js.map