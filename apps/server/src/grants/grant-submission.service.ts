import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrantSubmission, SubmissionState } from './entities/grant-submission.entity';

@Injectable()
export class GrantSubmissionService {
  constructor(
    @InjectRepository(GrantSubmission)
    private submissionRepository: Repository<GrantSubmission>,
  ) {}

  async create(
    grantId: string,
    state: SubmissionState,
    feedback?: string,
  ): Promise<GrantSubmission> {
    const existing = await this.submissionRepository.findOne({ where: { grantId } });
    if (existing) {
      existing.state = state;
      existing.feedback = feedback;
      return this.submissionRepository.save(existing);
    }

    const submission = this.submissionRepository.create({
      grantId,
      state,
      feedback,
    });
    return this.submissionRepository.save(submission);
  }

  async findAll(): Promise<GrantSubmission[]> {
    return this.submissionRepository.find({
      relations: ['grant'],
      where: { state: SubmissionState.APPROVED },
      order: { createdAt: 'DESC' },
    });
  }

  async findByGrantId(grantId: string): Promise<GrantSubmission | null> {
    return this.submissionRepository.findOne({ where: { grantId } });
  }
}
