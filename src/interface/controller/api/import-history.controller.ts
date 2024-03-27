import { Controller, Get, Inject, Query } from '@nestjs/common';

import { Import_History } from 'src/db/schemas/import-history.schema';
import { ParamsImportHistory } from 'src/usecase/import-history/interator';
import { IMPORT_HISTORY_INTERATOR, ImportHistoryUseCase } from 'src/usecase/import-history/usecase';
import { apiVersion } from 'src/utils/verison';


@Controller(`api/${apiVersion}/import-history`)
export class ImportHistoryController {
  constructor(
    @Inject(IMPORT_HISTORY_INTERATOR)
    private readonly importHistoryUseCase: ImportHistoryUseCase,
  ){}

  @Get()
  async getImportHistory(@Query() query?: ParamsImportHistory): Promise<Import_History[]> {
    return await this.importHistoryUseCase.getImportHistory(query)
  }
}