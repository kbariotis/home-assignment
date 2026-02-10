import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { GrantsService } from './grants.service';
import { GrantSubmissionService } from './grant-submission.service';
import { Grant } from './entities/grant.entity';
import { GrantSubmission, SubmissionState } from './entities/grant-submission.entity';

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
  async getSubmissions(): Promise<GrantSubmission[]> {
    return this.submissionService.findAll();
  }

  @Mutation('submitGrantFeedback')
  async submitFeedback(
    @Args('grantId') grantId: string,
    @Args('state') state: SubmissionState,
    @Args('feedback') feedback?: string,
  ): Promise<GrantSubmission> {
    return this.submissionService.create(grantId, state, feedback);
  }

  @ResolveField('submission')
  async getSubmission(@Parent() grant: Grant): Promise<GrantSubmission | null> {
    if (grant.submission) return grant.submission;
    return this.submissionService.findByGrantId(grant.id);
  }
}
