import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Import_History } from 'src/db/schemas/import-history.schema';
import { ImportHistoryUseCase } from './usecase';

export interface ParamsImportHistory {
  productName: string;
  createdAt: string;
}

@Injectable()
export class ImportHistoryInterator implements ImportHistoryUseCase {
  constructor(
    @InjectModel(Import_History.name)
    private importHistoryModel: mongoose.Model<Import_History>,
  ) { }

  async getImportHistory(params?: ParamsImportHistory): Promise<Import_History[]> {
    const response = await this.importHistoryModel.find(params).sort({ createdAt: -1 })
    return response
  }
}