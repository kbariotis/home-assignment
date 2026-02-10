import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grant } from './entities/grant.entity';

@Injectable()
export class GrantsService {
  constructor(
    @InjectRepository(Grant)
    private grantsRepository: Repository<Grant>,
  ) {}

  findAll(skip: number, take: number): Promise<Grant[]> {
    return this.grantsRepository.find({
      skip,
      take,
      order: {
        sourcedDate: 'DESC',
      },
    });
  }
}
