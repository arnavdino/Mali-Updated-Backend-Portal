"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserIdentityDocumentRemovalAudit1793217600000 = void 0;
class addUserIdentityDocumentRemovalAudit1793217600000 {
    constructor() {
        this.name = 'addUserIdentityDocumentRemovalAudit1793217600000';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user_identity_document\`
      ADD \`removed_by\` varchar(255) NULL,
      ADD \`removed_at\` timestamp NULL,
      ADD \`removal_reason\` varchar(500) NULL`);
        await queryRunner.query(`CREATE TABLE \`user_identity_document_removal_audit\` (
      \`id\` varchar(255) NOT NULL,
      \`document_id\` varchar(255) NOT NULL,
      \`user_id\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
      \`document_type\` varchar(64) NOT NULL,
      \`storage_key\` varchar(512) NOT NULL,
      \`original_filename\` varchar(255) NOT NULL,
      \`mime_type\` varchar(128) NOT NULL,
      \`file_size\` int NOT NULL,
      \`document_status\` varchar(32) NOT NULL,
      \`removed_by\` varchar(255) NOT NULL,
      \`removed_at\` timestamp NOT NULL,
      \`removal_reason\` varchar(500) NULL,
      PRIMARY KEY (\`id\`),
      KEY \`IDX_identity_document_removal_document\` (\`document_id\`),
      KEY \`IDX_identity_document_removal_user\` (\`user_id\`),
      CONSTRAINT \`FK_identity_document_removal_document\` FOREIGN KEY (\`document_id\`) REFERENCES \`user_identity_document\`(\`id\`) ON DELETE RESTRICT,
      CONSTRAINT \`FK_identity_document_removal_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE \`user_identity_document_removal_audit\`');
        await queryRunner.query(`ALTER TABLE \`user_identity_document\`
      DROP \`removal_reason\`,
      DROP \`removed_at\`,
      DROP \`removed_by\``);
    }
}
exports.addUserIdentityDocumentRemovalAudit1793217600000 = addUserIdentityDocumentRemovalAudit1793217600000;
//# sourceMappingURL=1793217600000-add-user-identity-document-removal-audit.js.map