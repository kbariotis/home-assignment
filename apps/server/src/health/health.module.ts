import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/**
 * Health module
 */
@Module({
  controllers: [HealthController],
})
export class HealthModule {}
