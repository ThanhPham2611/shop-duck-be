import { CreateSellProductDto } from 'src/interface/controller/api/dto/sell-product.dto'
import { ResponseMessage } from 'src/utils/response'

export interface SellProductUseCase {
  createSellProduct(params: CreateSellProductDto): Promise<ResponseMessage>;
}

export const SELL_PRODUCT_INTERATOR = 'SELL_PRODUCT_INTERATOR'