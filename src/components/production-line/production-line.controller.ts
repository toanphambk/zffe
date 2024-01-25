import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductionLineService } from './production-line.service';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { ProductionLine } from './entities/production-line.entity';
import { CreateProductionLineDto } from './dto/create-production-line.dto';
import { UpdateProductionLineDto } from './dto/update-production-line.dto';
import { NullableType } from 'src/utils/types/nullable.type';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Production Line')
@Controller('production-line')
export class ProductionLineController {
  constructor(private readonly productionLineService: ProductionLineService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The production line has been successfully created.',
    type: ProductionLine,
  })
  @Post()
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateProductionLineDto): Promise<ProductionLine> {
    return this.productionLineService.create(createDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of production lines retrieved successfully.',
    type: [ProductionLine],
  })
  @Get()
  @Roles(RoleEnum.admin, RoleEnum.user)
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ProductionLine[]> {
    return this.productionLineService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Single production line retrieved successfully.',
    type: ProductionLine,
  })
  @Get(':id')
  @Roles(RoleEnum.admin, RoleEnum.user)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<ProductionLine>> {
    return this.productionLineService.findOne({ id: +id });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The production line has been successfully updated.',
    type: ProductionLine,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.admin)
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductionLineDto,
  ): Promise<ProductionLine> {
    return this.productionLineService.update(+id, updateDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The production line has been successfully removed.',
  })
  @Delete(':id')
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.productionLineService.remove({ id: +id });
  }
}
