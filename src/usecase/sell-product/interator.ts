import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SellProductUseCase } from './usecase';
import { InjectModel } from '@nestjs/mongoose';
import { Sell_Product } from 'src/db/schemas/sell-product.schema';
import mongoose from 'mongoose';
import { CreateSellProductDto } from 'src/interface/controller/api/dto/sell-product.dto';
import { ResponseMessage } from 'src/utils/response';
import { Warehouse } from 'src/db/schemas/warehouse.schema';
import moment from 'moment';

@Injectable()
export class SellProductInterator implements SellProductUseCase {
  constructor(
    @InjectModel(Warehouse.name)
    private warehouseModel: mongoose.Model<Warehouse>,
    @InjectModel(Sell_Product.name)
    private sellProductModel: mongoose.Model<Sell_Product>,
  ) { }

  async createSellProduct(params: CreateSellProductDto): Promise<ResponseMessage> {
    try {
      const infoWareHouse = await this.warehouseModel.findOne({ productName: params.productName })
      if (!infoWareHouse) {
        throw new NotFoundException();
      }
      if (params.sellAmount > infoWareHouse.quantity) {
        throw new BadRequestException('Sản phẩm không còn đủ')
      }
      const newParams = {
        ...params,
        importPrice: infoWareHouse.importPrice,
        price: infoWareHouse.price,
        sellDate: moment(params.sellDate).format()
      }
      const existProduct = await this.sellProductModel.findOne({ productName: params.productName, sellDate: params.sellDate })
      if (existProduct) {
        await this.sellProductModel.findOneAndUpdate({ _id: existProduct._id }, { ...newParams, sellAmount: existProduct.sellAmount + params.sellAmount })
        await this.warehouseModel.findOneAndUpdate({ productName: params.productName }, { quantity: Number(infoWareHouse.quantity - params.sellAmount) })
        return {
          message: 'Mua thành công'
        }
      }
      await this.sellProductModel.create(newParams)
      await this.warehouseModel.findOneAndUpdate({ productName: params.productName }, { quantity: Number(infoWareHouse.quantity - params.sellAmount) })
      return {
        message: 'Mua thành công'
      }
    } catch (err) {
      console.log(err)
      throw new BadRequestException(err.message)
    }
  }
}