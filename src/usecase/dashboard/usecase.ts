import { ResponseDataDashboard } from './interator'


export interface DashboardUseCase {
  createDataDashboard(): Promise<void>;
  getData(): Promise<ResponseDataDashboard>;
}

export const DASHBOARD_INTERATOR = 'DASHBOARD_INTERATOR'