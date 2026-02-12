import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { GrantSubmission } from './grant-submission.entity';

/**
 * Entity representing a grant
 */
@Entity('grants')
export class Grant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'provider_name' })
  providerName: string;

  @Column({ name: 'grant_title' })
  grantTitle: string;

  @Column({ type: 'timestamp with time zone' })
  deadline: Date;

  @Column({ name: 'apply_url' })
  applyUrl: string;

  @Column()
  location: string;

  @Column('text', { array: true })
  areas: string[];

  @Column({ type: 'bigint', nullable: true })
  amount: number;

  @CreateDateColumn({ name: 'sourced_date', type: 'timestamp with time zone' })
  sourcedDate: Date;

  @OneToOne(() => GrantSubmission, (submission) => submission.grant)
  submission: GrantSubmission;
}
