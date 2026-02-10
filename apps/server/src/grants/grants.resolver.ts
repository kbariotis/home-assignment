import { Resolver, Query, Args } from '@nestjs/graphql';
import { GrantsService } from './grants.service';
import { Grant } from './entities/grant.entity';

@Resolver('Grant')
export class GrantsResolver {
  constructor(private grantsService: GrantsService) {}

  @Query('grants')
  async getGrants(
    @Args('skip') skip: number,
    @Args('take') take: number,
  ): Promise<Grant[]> {
    return this.grantsService.findAll(skip, take);
  }
}
