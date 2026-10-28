"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserIdentityDocuments1793131200000 = void 0;
class addUserIdentityDocuments1793131200000 {
    constructor() {
        this.name = 'addUserIdentityDocuments1793131200000';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user_identity_document\` (
      \`id\` varchar(255) NOT NULL,
      \`user_id\` varchar(255) NOT NULL,
      \`document_type\` varchar(64) NOT NULL,
      \`storage_key\` varchar(512) NOT NULL,
      \`original_filename\` varchar(255) NOT NULL,
      \`mime_type\` varchar(128) NOT NULL,
      \`file_size\` int NOT NULL,
      \`status\` varchar(32) NOT NULL DEFAULT 'pending',
      \`reviewed_by\` varchar(255) NULL,
      \`reviewed_at\` timestamp NULL,
      \`rejection_reason\` varchar(500) NULL,
      \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE KEY \`IDX_identity_document_user_type\` (\`user_id\`, \`document_type\`),
      CONSTRAINT \`FK_identity_document_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE `user_identity_document`');
    }
}
exports.addUserIdentityDocuments1793131200000 = addUserIdentityDocuments1793131200000;
//# sourceMappingURL=1793131200000-add-user-identity-documents.js.map