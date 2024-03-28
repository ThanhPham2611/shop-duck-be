import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ResponseDataDashboard } from 'src/usecase/dashboard/interator';
import { DASHBOARD_INTERATOR, DashboardUseCase } from 'src/usecase/dashboard/usecase';
import { apiVersion } from 'src/utils/verison';

@Controller(`api/${apiVersion}/dashboard`)
export class DashboardController {
  constructor(
    @Inject(DASHBOARD_INTERATOR)
    private readonly dashboardUseCase: DashboardUseCase,
  ) { }

  @Get()
  async getDataDashboard(): Promise<ResponseDataDashboard> {
    return await this.dashboardUseCase.getData()
  }
}