import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtStrategy } from 'src/services/jwt.strategy';
import { UseCaseModule } from 'src/usecase/usecase.module';
import { AuthController } from './api/auth.controller';
import { WarehouseController } from './api/warehouse.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AuthController, WarehouseController],
  providers: [JwtStrategy, JwtService],
})
export class ApiControllerModule {}
