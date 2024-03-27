import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtStrategy } from 'src/services/jwt.strategy';
import { UseCaseModule } from 'src/usecase/usecase.module';
import { AuthController } from './api/auth.controller';
import { WarehouseController } from './api/warehouse.controller';
import { ImportHistoryController } from './api/import-history.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AuthController, WarehouseController, ImportHistoryController],
  providers: [JwtStrategy, JwtService],
})
export class ApiControllerModule {}
