import { Warehouse } from 'src/db/schemas/warehouse.schema';
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from 'src/interface/controller/api/dto/warehouse.dto';
import { ResponseMessage } from 'src/utils/response';

export interface WarehouseUseCase {
  getProduct(): Promise<Warehouse[]>;
  createProduct(params: CreateProductDto): Promise<ResponseMessage>;
  updateProduct(params: UpdateProductDto): Promise<ResponseMessage>;
  deleteProduct(params: DeleteProductDto): Promise<ResponseMessage>;
}

export const WARE_HOUSE_INTERATOR = 'WARE_HOUSE_INTERATOR';
