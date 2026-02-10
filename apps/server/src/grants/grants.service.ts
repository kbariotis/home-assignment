import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { Grant } from './entities/grant.entity';

@Injectable()
export class GrantsService {
  constructor(
    @InjectRepository(Grant)
    private grantsRepository: Repository<Grant>,
  ) {}

  findAll(skip: number, take: number, submitted?: boolean): Promise<Grant[]> {
    const where: any = {};
    if (submitted !== undefined) {
      where.submission = submitted ? Not(IsNull()) : IsNull();
    }

    return this.grantsRepository.find({
      where,
      skip,
      take,
      order: {
        sourcedDate: 'DESC',
      },
      relations: ['submission'],
    });
  }
}
