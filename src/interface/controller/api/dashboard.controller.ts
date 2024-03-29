import { Controller, Get, Inject, Query } from '@nestjs/common';
import moment from 'moment';
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
  async getDataDashboard(
    @Query() query?: { startDate: string, endDate: string }
  ): Promise<ResponseDataDashboard> {
    return await this.dashboardUseCase.getData(query.startDate, query.endDate)
  }
}