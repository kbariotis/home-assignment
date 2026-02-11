import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionOrderBy, OrderDirection } from 'graphql-server';
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

  async findAll(
    orderBy: SubmissionOrderBy = SubmissionOrderBy.PROVIDER_NAME,
    orderDir: OrderDirection = OrderDirection.DESC,
  ): Promise<GrantSubmission[]> {
    const query = this.submissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.grant', 'grant')
      .where('submission.state = :state', { state: SubmissionState.APPROVED });

    if (orderBy === SubmissionOrderBy.PROVIDER_NAME) {
      query.orderBy('grant.providerName', orderDir);
    } else if (orderBy === SubmissionOrderBy.GRANT_TITLE) {
      query.orderBy('grant.grantTitle', orderDir);
    }

    query.addOrderBy('submission.createdAt', 'DESC');

    return query.getMany();
  }

  async findByGrantId(grantId: string): Promise<GrantSubmission | null> {
    return this.submissionRepository.findOne({ where: { grantId } });
  }
}
