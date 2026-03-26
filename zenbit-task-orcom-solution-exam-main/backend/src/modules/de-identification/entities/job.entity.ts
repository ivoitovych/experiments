import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { User } from '@/modules/users/entities/user.entity';
import type { Document } from './document.entity';

export enum JobStatus {
  DRAFT = 'draft',
  CONFIGURED = 'configured',
  QUEUED = 'queued',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('User', { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Index()
  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.DRAFT,
  })
  status: JobStatus;

  @Column({ type: 'int', default: 1 })
  currentStep: number;

  @Column({ type: 'json', nullable: true })
  wizardState: Record<string, any> | null;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @OneToOne('Document', { nullable: true, eager: false })
  @JoinColumn({ name: 'documentId' })
  document: Document | null;

  @Column({ nullable: true })
  documentId: string | null;

  @Column({ type: 'json', nullable: true })
  error: { code: string; message: string } | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
