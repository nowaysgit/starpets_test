import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBalanceDto {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  amount: number;
}
