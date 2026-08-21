"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionChanges1727972081272 = void 0;
class transactionChanges1727972081272 {
    constructor() {
        this.name = 'transactionChanges1727972081272';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`transactions\` (\`id\` varchar(255) NOT NULL, \`payment_method\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`amount\` int NOT NULL, \`fee_1\` int NOT NULL DEFAULT '0', \`fee_2\` int NOT NULL DEFAULT '0', \`fee_3\` int NOT NULL DEFAULT '0', \`notes\` varchar(255) NOT NULL DEFAULT '', \`completed_at\` datetime NOT NULL, \`canceled_at\` datetime NOT NULL, \`refunded_at\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`customer_id\` varchar(255) NULL, \`vendor_id\` varchar(255) NULL, \`product_id\` varchar(255) NULL, \`product_category\` varchar(255) NULL, \`created_by\` varchar(255) NULL, \`warehouse_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB CHARACTER SET="utf8mb4" COLLATE="utf8mb4_unicode_ci"`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`unit\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`common\` \`common\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`region\` \`region\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_6f09843c214f21a462b54b11e8d\` FOREIGN KEY (\`customer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_5fb1addc4312f215acef39a3620\` FOREIGN KEY (\`vendor_id\`) REFERENCES \`vendor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_8d5b2e87f2129081ebacc894f8f\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_ad880529054592e3b6d98e619ab\` FOREIGN KEY (\`product_category\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_77e84561125adeccf287547f66e\` FOREIGN KEY (\`created_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_0cbce939001bf5880454089193b\` FOREIGN KEY (\`warehouse_id\`) REFERENCES \`warehouse\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_0cbce939001bf5880454089193b\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_77e84561125adeccf287547f66e\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_ad880529054592e3b6d98e619ab\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_8d5b2e87f2129081ebacc894f8f\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_5fb1addc4312f215acef39a3620\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_6f09843c214f21a462b54b11e8d\``);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`region\` \`region\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`location\` CHANGE \`common\` \`common\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`unit\``);
        await queryRunner.query(`DROP TABLE \`transactions\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97bb3a124fc8c9afa05565c25a\` ON \`vendor\` (\`location_id\`)`);
    }
}
exports.transactionChanges1727972081272 = transactionChanges1727972081272;
//# sourceMappingURL=1727972081272-transaction-changes.js.map