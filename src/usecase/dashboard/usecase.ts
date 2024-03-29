import { ResponseDataDashboard } from './interator'


export interface DashboardUseCase {
  createDataDashboard(): Promise<void>;
  getData(startDate: string, endDate: string): Promise<ResponseDataDashboard>;
}

export const DASHBOARD_INTERATOR = 'DASHBOARD_INTERATOR'