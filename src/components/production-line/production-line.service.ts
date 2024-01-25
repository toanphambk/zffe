import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { CreateProductionLineDto } from './dto/create-production-line.dto';
import { UpdateProductionLineDto } from './dto/update-production-line.dto';
import { ProductionLine } from './entities/production-line.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class ProductionLineService {
  constructor(
    @InjectRepository(ProductionLine)
    private repo: Repository<ProductionLine>,
  ) {}

  create(createDto: CreateProductionLineDto): Promise<ProductionLine> {
    const productionLine = this.repo.create(createDto);
    return this.repo.save(productionLine);
  }

  findAll(): Promise<ProductionLine[]> {
    return this.repo.find(); // Adjusted query
  }

  async findOne(
    fields: EntityCondition<ProductionLine>,
  ): Promise<NullableType<ProductionLine>> {
    const entity = await this.repo.findOne({
      where: fields,
    });

    if (!entity) {
      throw new NotFoundException('Production line not found');
    }

    return entity;
  }

  async update(
    id: number,
    updateDto: UpdateProductionLineDto,
  ): Promise<ProductionLine> {
    const existingDoc = await this.findOne({ id: +id });
    if (!existingDoc) {
      throw new NotFoundException('Product category not found');
    }

    const existingDocWithUniqueField = await this.repo.findOne({
      where: [
        { systemID: updateDto.systemID, id: Not(Equal(id)) },
        { stationName: updateDto.stationName, id: Not(Equal(id)) },
        { stationID: updateDto.stationID, id: Not(Equal(id)) },
        { ipAddress: updateDto.ipAddress, id: Not(Equal(id)) },
      ],
    });

    if (existingDocWithUniqueField) {
      throw new ConflictException(
        'Another Production line with the same name/ID already exists',
      );
    }

    Object.assign(existingDoc, updateDto);
    return this.repo.save(existingDoc);
  }

  async remove(fields: EntityCondition<ProductionLine>): Promise<void> {
    const found = await this.repo.findOne({
      where: fields,
    });
    if (!found) {
      throw new NotFoundException('Production Line not found');
    }
    await this.repo.softRemove(found);
  }
}
