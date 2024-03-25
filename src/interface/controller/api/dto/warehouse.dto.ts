import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  importAmount: number;

  @IsNumber()
  @IsNotEmpty()
  importPrice: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class UpdateProductDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  importAmount: number;

  @IsNumber()
  @IsNotEmpty()
  importPrice: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class DeleteProductDto {
  @IsNotEmpty()
  id: string;
}
