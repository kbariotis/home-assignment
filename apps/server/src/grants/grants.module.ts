import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantsService } from './grants.service';
import { GrantsResolver } from './grants.resolver';
import { Grant } from './entities/grant.entity';
import { GrantSubmission } from './entities/grant-submission.entity';
import { GrantSubmissionService } from './grant-submission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grant, GrantSubmission])],
  providers: [GrantsService, GrantsResolver, GrantSubmissionService],
  exports: [GrantsService, GrantSubmissionService],
})
export class GrantsModule {}
