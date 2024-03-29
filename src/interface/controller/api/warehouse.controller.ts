import { Body, Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import {
  WARE_HOUSE_INTERATOR,
  WarehouseUseCase,
} from 'src/usecase/warehouse/usecase';
import { apiVersion } from 'src/utils/verison';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from './dto/warehouse.dto';
import { ResponseMessage } from 'src/utils/response';
import { Warehouse } from 'src/db/schemas/warehouse.schema';

@Controller(`api/${apiVersion}/warehouse`)
export class WarehouseController {
  constructor(
    @Inject(WARE_HOUSE_INTERATOR)
    private readonly warehouseUseCase: WarehouseUseCase,
  ) { }

  @Get()
  async getProduct(): Promise<Warehouse[]> {
    return await this.warehouseUseCase.getProduct()
  }

  @Post('create')
  async createProduct(@Body() req: CreateProductDto): Promise<ResponseMessage> {
    return await this.warehouseUseCase.createProduct(req);
  }

  @Post('update')
  async updateProduct(@Body() req: UpdateProductDto): Promise<ResponseMessage> {
    await this.warehouseUseCase.updateProduct(req);
    return {
      message: 'Cập nhật sản phẩm thành công',
    };
  }

  @Post('delete')
  async DeleteProductDto(
    @Body() req: DeleteProductDto,
  ): Promise<ResponseMessage> {
    await this.warehouseUseCase.deleteProduct(req);
    return {
      message: 'Xóa sản phẩm thành công',
    };
  }
}
