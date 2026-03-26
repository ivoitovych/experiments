import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { User } from '@/modules/users/entities/user.entity';
import type { PresidioRecognizerResult } from '../presidio.service';

export type DocumentStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type ComplianceFramework = 'hipaa' | 'gdpr' | 'uk_dpi' | 'swiss_fadp' | 'custom';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  userId: string;

  @ManyToOne('User', 'documents', { onDelete: 'CASCADE' })
  user: User;

  @Column('text')
  originalText: string;

  @Column('text', { nullable: true })
  anonymizedText: string | null;

  @Column({
    type: 'enum',
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  })
  status: DocumentStatus;

  @Column({ default: 0 })
  entityCount: number;

  @Column({ type: 'int', nullable: true })
  processingTimeMs: number | null;

  @Column({
    type: 'enum',
    enum: ['hipaa', 'gdpr', 'uk_dpi', 'swiss_fadp', 'custom'],
    default: 'hipaa',
  })
  framework: ComplianceFramework;

  @Column('json', { nullable: true })
  analysisResult: PresidioRecognizerResult[] | null;

  @CreateDateColumn()
  createdAt: Date;
}
