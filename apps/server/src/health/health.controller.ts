import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  constructor(private dataSource: DataSource) {}

  @Get()
  async check(@Res() res: Response) {
    try {
      await this.dataSource.query('SELECT 1');
      return res.status(HttpStatus.OK).json({
        status: 'ok',
        database: 'connected',
      });
    } catch (error) {
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        status: 'error',
        database: 'disconnected',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
