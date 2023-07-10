import { Module } from '@nestjs/common';
import { PairModule } from './pair/pair.module';

@Module({
  imports: [PairModule],
})
export class ApiModule {}
