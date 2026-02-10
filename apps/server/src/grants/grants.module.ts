import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantsService } from './grants.service';
import { GrantsResolver } from './grants.resolver';
import { Grant } from './entities/grant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grant])],
  providers: [GrantsService, GrantsResolver],
  exports: [GrantsService],
})
export class GrantsModule {}
