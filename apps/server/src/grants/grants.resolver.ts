import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GrantsService } from './grants.service';
import { GrantSubmissionService } from './grant-submission.service';
import { Grant } from './entities/grant.entity';
import { GrantSubmission, SubmissionState } from './entities/grant-submission.entity';

import { SubmissionOrderBy, OrderDirection, ApplicationError } from 'graphql-server';

@Resolver('Grant')
export class GrantsResolver {
  constructor(
    private grantsService: GrantsService,
    private submissionService: GrantSubmissionService,
  ) {}

  @Query('grants')
  async getGrants(
    @Args('skip') skip: number,
    @Args('take') take: number,
    @Args('submitted') submitted?: boolean,
  ): Promise<Grant[]> {
    return this.grantsService.findAll(skip, take, submitted);
  }

  @Query('submissions')
  async getSubmissions(
    @Args('orderBy') orderBy: SubmissionOrderBy,
    @Args('orderDir') orderDir: OrderDirection,
  ): Promise<GrantSubmission[]> {
    return this.submissionService.findAll(orderBy, orderDir);
  }

  @Mutation('submitGrantFeedback')
  async submitFeedback(
    @Args('grantId') grantId: string,
    @Args('state') state: SubmissionState,
    @Args('feedback') feedback?: string,
  ): Promise<GrantSubmission | ApplicationError> {
    return this.submissionService.create(grantId, state, feedback);
  }
}
