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

    const query = this.grantsRepository.createQueryBuilder('grant')
      .leftJoinAndSelect('grant.submission', 'submission')
      .orderBy('grant.sourcedDate', 'DESC')
      .skip(skip)
      .take(take);

    if (submitted !== undefined) {
      if (submitted) {
        query.andWhere('submission.id IS NOT NULL');
      } else {
        query.andWhere('submission.id IS NULL');
      }
    }

    return query.getMany();
  }
}
