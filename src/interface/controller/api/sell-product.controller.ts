import { Body, Controller, Inject, Post } from '@nestjs/common';

import { SELL_PRODUCT_INTERATOR, SellProductUseCase } from 'src/usecase/sell-product/usecase';
import { apiVersion } from 'src/utils/verison';
import { CreateSellProductDto } from './dto/sell-product.dto';
import { ResponseMessage } from 'src/utils/response';

@Controller(`api/${apiVersion}/sell-product`)
export class SellProductController {
  constructor(
    @Inject(SELL_PRODUCT_INTERATOR)
    private readonly sellProductUseCase: SellProductUseCase,
  ) { }

  @Post('create')
  async createSellProduct(@Body() params: CreateSellProductDto): Promise<ResponseMessage> {
    return await this.sellProductUseCase.createSellProduct(params)
  }
}