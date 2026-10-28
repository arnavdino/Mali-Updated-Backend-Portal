import { User } from './user.entity';
export declare enum IdentityDocumentType {
    ID_PHOTO = "id_photo",
    SELFIE = "selfie",
    PROOF_OF_ADDRESS = "proof_of_address"
}
export declare enum IdentityDocumentStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class UserIdentityDocument {
    id: string;
    userId: string;
    user: User;
    documentType: IdentityDocumentType;
    storageKey: string;
    originalFilename: string;
    mimeType: string;
    fileSize: number;
    status: IdentityDocumentStatus;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    rejectionReason: string | null;
    removedBy: string | null;
    removedAt: Date | null;
    removalReason: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UserIdentityDocumentRemovalAudit {
    id: string;
    documentId: string;
    userId: string;
    documentType: IdentityDocumentType;
    storageKey: string;
    originalFilename: string;
    mimeType: string;
    fileSize: number;
    documentStatus: IdentityDocumentStatus;
    removedBy: string;
    removedAt: Date;
    removalReason: string | null;
}
