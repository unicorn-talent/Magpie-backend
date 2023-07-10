import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePairDto {
  @IsString()
  @IsNotEmpty()
  public pair: string;

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public token0_id: string;

  @IsNotEmpty()
  public token0_name: string;

  @IsNotEmpty()
  public token1_id: string;

  @IsNotEmpty()
  public token1_name: string;
}
