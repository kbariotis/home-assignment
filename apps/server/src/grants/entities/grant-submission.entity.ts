import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Grant } from './grant.entity';

export enum SubmissionState {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('grant_submissions')
export class GrantSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  readonly __typename = 'GrantSubmission';

  @Column({ name: 'grant_id' })
  grantId: string;

  @OneToOne(() => Grant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'grant_id' })
  grant: Grant;

  @Column({
    type: 'enum',
    enum: SubmissionState,
  })
  state: SubmissionState;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
}
