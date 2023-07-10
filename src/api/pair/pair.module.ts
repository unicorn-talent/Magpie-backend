import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairController } from './pair.controller';
import { Pair } from './pair.entity';
import { PairService } from './pair.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pair])],
  controllers: [PairController],
  providers: [PairService],
})
export class PairModule {}
