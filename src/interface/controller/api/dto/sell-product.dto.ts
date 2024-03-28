import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSellProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  sellAmount: number;
}