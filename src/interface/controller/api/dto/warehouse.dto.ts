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

  @IsString()
  @IsNotEmpty()
  importDate: string;
}

export class UpdateProductDto extends CreateProductDto {
  @IsNotEmpty()
  id: string;
}

export class DeleteProductDto {
  @IsNotEmpty()
  id: string;
}
