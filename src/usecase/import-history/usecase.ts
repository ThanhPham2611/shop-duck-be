import { ParamsImportHistory } from './interator';
import { Import_History } from 'src/db/schemas/import-history.schema';

export interface ImportHistoryUseCase {
  getImportHistory(params?: ParamsImportHistory): Promise<Import_History[]>;
}

export const IMPORT_HISTORY_INTERATOR = 'IMPORT_HISTORY_INTERATOR';
