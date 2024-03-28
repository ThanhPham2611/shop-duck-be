import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtStrategy } from 'src/services/jwt.strategy';
import { UseCaseModule } from 'src/usecase/usecase.module';
import { AuthController } from './api/auth.controller';
import { WarehouseController } from './api/warehouse.controller';
import { ImportHistoryController } from './api/import-history.controller';
import { SellProductController } from './api/sell-product.controller';
import { DashboardController } from './api/dashboard.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AuthController,
    WarehouseController,
    ImportHistoryController
    , SellProductController,
    DashboardController
  ],
  providers: [JwtStrategy, JwtService],
})
export class ApiControllerModule { }
