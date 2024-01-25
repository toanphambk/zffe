import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Shift } from 'src/shift/entities/shift.entity';

@Entity()
export class ProductionLine {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the production line',
  })
  id: number;

  @Column({ name: 'SystemID' })
  @ApiProperty({
    example: 'SYS001',
    description: 'System ID of the production line',
  })
  systemID: string;

  @Column({ name: 'LineID' })
  @ApiProperty({
    example: 'LINE01',
    description: 'Line ID of the production line',
  })
  lineID: string;

  @Column({ name: 'StationName' })
  @ApiProperty({
    example: 'Station 1',
    description: 'Name of the station in the production line',
  })
  stationName: string;

  @Column({ name: 'StationID' })
  @ApiProperty({
    example: 'STN01',
    description: 'Station ID in the production line',
  })
  stationID: string;

  @Column()
  @ApiProperty({
    example: 'This line produces widgets',
    description: 'Description of the production line',
  })
  description: string;

  @Column({ name: 'ipAddress' })
  @ApiProperty({
    example: '192.168.1.1',
    description: 'IP address of the production line',
  })
  ipAddress: string;

  @OneToMany(() => Shift, (shift) => shift.productionLine)
  shifts: Shift[];

  @CreateDateColumn()
  @Exclude()
  // @ApiProperty({
  //   example: '2021-01-01T00:00:00.000Z',
  //   description: 'Creation date of the production line record',
  // })
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  // @ApiProperty({
  //   example: '2021-01-01T00:00:00.000Z',
  //   description: 'Last update date of the production line record',
  // })
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  // @ApiProperty({
  //   example: '2021-01-01T00:00:00.000Z',
  //   description: 'Deletion date of the production line record',
  //   nullable: true,
  // })
  deletedAt: Date;
}
