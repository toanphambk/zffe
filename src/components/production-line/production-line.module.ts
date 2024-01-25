import { Module } from '@nestjs/common';
import { ProductionLineService } from './production-line.service';
import { IsExist } from '../utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionLineController } from './production-line.controller';
import { ProductionLine } from './entities/production-line.entity';
import { IsRecordExist } from 'src/utils/validators/is-record-exist.validator';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionLine])],
  controllers: [ProductionLineController],
  providers: [IsExist, IsNotExist, IsRecordExist, ProductionLineService],
  exports: [ProductionLineService],
})
export class ProductionLineModule {}
