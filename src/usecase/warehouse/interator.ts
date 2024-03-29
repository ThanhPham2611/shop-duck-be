import { BadGatewayException, BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Import_History } from 'src/db/schemas/import-history.schema';
import { Warehouse } from 'src/db/schemas/warehouse.schema';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from 'src/interface/controller/api/dto/warehouse.dto';
import { ResponseMessage } from 'src/utils/response';
import { WarehouseUseCase } from './usecase';
import moment from 'moment';

@Injectable()
export class WarehouseInterator implements WarehouseUseCase {
  constructor(
    @InjectModel(Warehouse.name)
    private warehouseModel: mongoose.Model<Warehouse>,
    @InjectModel(Import_History.name)
    private importHistoryModel: mongoose.Model<Import_History>,
  ) { }

  async getProduct(): Promise<Warehouse[]> {
    const response = await this.warehouseModel.find();
    return response
  }

  async updateProduct(params: UpdateProductDto): Promise<ResponseMessage> {
    try {
      const { importAmount, importPrice, price, productName, id, importDate } = params;
      const info = await this.warehouseModel.findOne({ _id: id });
      await this.warehouseModel.findByIdAndUpdate(
        { _id: id },
        {
          importPrice,
          importAmount: Number(importAmount + info.importAmount),
          quantity: Number(importAmount + info.quantity),
          price,
          productName,
          importDate: moment(importDate).format()
        },
      );
      await this.importHistoryModel.create({
        importAmount,
        productName,
        importPrice: Number(importAmount * importPrice)
      });
      return {
        message: 'Cập nhật thành công',
      };
    } catch (err) {
      console.log(err);
      throw new NotFoundException();
    }
  }

  async createProduct(params: CreateProductDto): Promise<ResponseMessage> {
    try {
      const { importAmount, importPrice, price, productName, importDate } = params;
      const infoWarehouse = await this.warehouseModel.findOne({ productName });
      if (infoWarehouse) {
        throw new ConflictException('Tên mặt hàng bị trùng')
      }
      if (importPrice > price) {
        throw new BadGatewayException('Giá nhập cao hơn giá bán')
      }
      //save to db
      await this.warehouseModel.create({
        importPrice,
        price,
        productName,
        importAmount,
        quantity: importAmount,
        importDate: moment(importDate).format()
      });
      await this.importHistoryModel.create({
        importAmount,
        productName,
        importPrice: Number(importAmount * importPrice),
        importDate: moment(importDate).format()
      });
      return {
        message: 'Thêm sản phẩm thành công',
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message)
    }
  }

  async deleteProduct(params: DeleteProductDto): Promise<ResponseMessage> {
    try {
      await this.warehouseModel.deleteOne({ _id: params.id });
      return {
        message: 'success',
      };
    } catch (err) {
      console.log(err);
      throw new NotFoundException();
    }
  }
}
