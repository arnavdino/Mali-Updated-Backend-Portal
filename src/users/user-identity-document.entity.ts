import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum IdentityDocumentType {
  ID_PHOTO = 'id_photo',
  SELFIE = 'selfie',
  PROOF_OF_ADDRESS = 'proof_of_address',
}

export enum IdentityDocumentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('user_identity_document')
@Index(['userId', 'documentType'], { unique: true })
export class UserIdentityDocument {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'document_type', length: 64 })
  documentType: IdentityDocumentType;

  // This is an S3 object key, never a publicly accessible document URL.
  @Column({ name: 'storage_key', length: 512 })
  storageKey: string;

  @Column({ name: 'original_filename', length: 255 })
  originalFilename: string;

  @Column({ name: 'mime_type', length: 128 })
  mimeType: string;

  @Column({ name: 'file_size', type: 'int' })
  fileSize: number;

  @Column({ length: 32, default: IdentityDocumentStatus.PENDING })
  status: IdentityDocumentStatus;

  @Column({ name: 'reviewed_by', nullable: true })
  reviewedBy: string | null;

  @Column({ name: 'reviewed_at', nullable: true, type: 'timestamp' })
  reviewedAt: Date | null;

  @Column({ name: 'rejection_reason', nullable: true, type: 'varchar', length: 500 })
  rejectionReason: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
