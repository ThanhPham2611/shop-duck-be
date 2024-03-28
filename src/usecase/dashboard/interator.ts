import { Injectable } from '@nestjs/common';
import { DashboardUseCase } from './usecase';
import { InjectModel } from '@nestjs/mongoose';
import { Dashboard } from 'src/db/schemas/dashboard.schema';
import mongoose from 'mongoose';
import { Import_History } from 'src/db/schemas/import-history.schema';
import { Sell_Product } from 'src/db/schemas/sell-product.schema';

export interface ResponseDataDashboard {
  totalPrice: number;
  totalImportPrice: number;
  totalInterest: number;
  arrayProduct: [
    {
      productName: string;
      quantity: number;
    }
  ]
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
  ) { }

  async createDataDashboard(): Promise<void> {
    const response = await this.sellProductModel.find();
    console.log(response)
    return
  }

  async getData(): Promise<ResponseDataDashboard> {
    const response = await this.sellProductModel.find();
    console.log(response)
    return
  }

}