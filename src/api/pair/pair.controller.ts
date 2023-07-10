import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreatePairDto } from './pair.dto';
import { Pair } from './pair.entity';
import { PairService } from './pair.service';

@Controller('pair')
export class PairController {
  @Inject(PairService)
  private readonly service: PairService;

  @Get(':id')
  public getPair(@Param('id', ParseIntPipe) id: number): Promise<Pair> {
    return this.service.getPair(id);
  }

  @Post()
  public createPair(@Body() body: CreatePairDto): Promise<Pair> {
    console.log({ body });
    return this.service.createPair(body);
  }
}
