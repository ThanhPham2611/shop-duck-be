import { Injectable } from '@nestjs/common';
import { DashboardUseCase } from './usecase';
import { InjectModel } from '@nestjs/mongoose';
import { Dashboard } from 'src/db/schemas/dashboard.schema';
import mongoose from 'mongoose';
import { Import_History } from 'src/db/schemas/import-history.schema';
import { Sell_Product } from 'src/db/schemas/sell-product.schema';
import { Warehouse } from 'src/db/schemas/warehouse.schema';
import moment from 'moment';
import { format } from 'path';

export interface ResponseDataDashboard {
  totalPrice: number;
  totalImportPrice: number;
  totalInterest: number;
  arraySellProduct: {
    productName: string;
    sellAmount: number;
  }[]
}

@Injectable()
export class DashboardInterator implements DashboardUseCase {
  constructor(
    @InjectModel(Dashboard.name)
    private dashboardModel: mongoose.Model<Dashboard>,
    @InjectModel(Import_History.name)
    private importHistoryModel: mongoose.Model<Import_History>,
    @InjectModel(Sell_Product.name)
    private sellProductModel: mongoose.Model<Sell_Product>,
    @InjectModel(Warehouse.name)
    private warehouseUseCase: mongoose.Model<Warehouse>
  ) { }

  async createDataDashboard(): Promise<void> {
    const response = await this.sellProductModel.find();
    console.log(response)
    return
  }

  async getData(startDate: string, endDate: string): Promise<ResponseDataDashboard> {
    const arrayImportHistory = await this.importHistoryModel.find(startDate && endDate ? { importDate: { $gte: moment(startDate).format(), $lte: moment(endDate).format() } } : null);
    const totalImportPrice = arrayImportHistory.reduce((acc, cur) => acc + cur.importPrice, 0)
    const arraySellProduct = await this.sellProductModel.find(startDate && endDate ? { createdAt: { $gte: startDate, $lte: endDate } } : null);
    const totalPrice = arraySellProduct.reduce((acc, cur) => acc + (cur.price * cur.sellAmount), 0)
    const wareHouse = await this.warehouseUseCase.find();
    const totalPriceItem = {}
    arraySellProduct.forEach(item => {
      const { productName, sellAmount } = item;
      if (totalPriceItem[productName]) {
        totalPriceItem[productName] += sellAmount;
      } else {
        totalPriceItem[productName] = sellAmount;
      }
    })
    return {
      totalImportPrice,
      totalPrice,
      totalInterest: Number(totalPrice - totalImportPrice),
      arraySellProduct: wareHouse.map(item => {
        return {
          productName: item.productName,
          sellAmount: totalPriceItem[item.productName] || 0
        }
      })
    }
  }

}