/**
 * User Entity
 *
 * Key design decisions:
 *   - UUID primary key (prevent enumeration attacks — integers like /users/1, /users/2 leak data)
 *   - @Index on email for fast lookups (login, magic link)
 *   - @Column({ select: false }) on magicLinkToken — never included in default SELECTs
 *   - @CreateDateColumn / @UpdateDateColumn — TypeORM handles these automatically
 *   - @OneToMany to documents (lazy — not eagerly loaded to avoid N+1)
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Document } from '@/modules/de-identification/entities/document.entity';

export type UserRole = 'admin' | 'analyst' | 'viewer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })   // unique constraint at DB level — also creates an index
  email: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Column({
    type: 'enum',
    enum: ['admin', 'analyst', 'viewer'],
    default: 'analyst',
  })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true, select: false })   // select: false → excluded from all queries by default
  magicLinkToken: string | null;

  @Column({ nullable: true, type: 'datetime', select: false })
  magicLinkExpiresAt: Date | null;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relation: one user has many documents
  // Defined as a type function to avoid circular dependencies between entity files
  @OneToMany('Document', 'user')
  documents: Document[];
}
