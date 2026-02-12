import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GrantsService } from './grants.service';
import { GrantSubmissionService } from './grant-submission.service';
import { Grant } from './entities/grant.entity';
import { GrantSubmission } from './entities/grant-submission.entity';

import {
  ApplicationError,
  GrantFilterInput,
  SubmissionOrderInput,
  SubmitGrantFeedbackInput,
} from 'graphql-server';

@Resolver('Grant')
export class GrantsResolver {
  constructor(
    private grantsService: GrantsService,
    private submissionService: GrantSubmissionService,
  ) {}

  @Query('grants')
  async getGrants(@Args('input') input: GrantFilterInput): Promise<Grant[]> {
    return this.grantsService.findAll(input.skip, input.take, input.submitted);
  }

  @Query('submissions')
  async getSubmissions(@Args('orderBy') orderBy: SubmissionOrderInput): Promise<GrantSubmission[]> {
    return this.submissionService.findAll(orderBy.field, orderBy.direction);
  }

  @Mutation('submitGrantFeedback')
  async submitFeedback(
    @Args('input') input: SubmitGrantFeedbackInput,
  ): Promise<GrantSubmission | ApplicationError> {
    return this.submissionService.create(input.grantId, input.state, input.feedback);
  }
}
