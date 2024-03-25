import { Body, Controller, Delete, Inject, Post } from '@nestjs/common';
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

@Controller(`api/${apiVersion}/warehouse`)
export class WarehouseController {
  constructor(
    @Inject(WARE_HOUSE_INTERATOR)
    private readonly warehouseUseCase: WarehouseUseCase,
  ) {}

  @Post('create')
  async createProduct(@Body() req: CreateProductDto): Promise<ResponseMessage> {
    await this.warehouseUseCase.createProduct(req);
    return {
      message: 'Thêm sản phẩm thành công',
    };
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
