import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_INTERATOR } from './auth/usecase';
import { AuthInterator } from './auth/interator';
import { MongooseModule } from '@nestjs/mongoose';
import { WARE_HOUSE_INTERATOR } from './warehouse/usecase';
import { WarehouseInterator } from './warehouse/interator';
import { WarehouseSchema } from 'src/db/schemas/warehouse.schema';
import { ImportHistorySchema } from 'src/db/schemas/import-history.schema';
import { IMPORT_HISTORY_INTERATOR } from './import-history/usecase';
import { ImportHistoryInterator } from './import-history/interator';
import { SELL_PRODUCT_INTERATOR } from './sell-product/usecase';
import { SellProductInterator } from './sell-product/interator';
import { SellProductSchema } from 'src/db/schemas/sell-product.schema';
import { DASHBOARD_INTERATOR } from './dashboard/usecase';
import { DashboardInterator } from './dashboard/interator';
import { DashboardSchema } from 'src/db/schemas/dashboard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Sell_Product', schema: SellProductSchema },
      { name: 'Warehouse', schema: WarehouseSchema },
      { name: 'Import_History', schema: ImportHistorySchema },
      { name: 'Dashboard', schema: DashboardSchema }
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.JWT_SECRET }),
    }),
  ],
  providers: [
    {
      provide: AUTH_INTERATOR,
      useClass: AuthInterator,
    },
    {
      provide: WARE_HOUSE_INTERATOR,
      useClass: WarehouseInterator,
    },
    {
      provide: IMPORT_HISTORY_INTERATOR,
      useClass: ImportHistoryInterator,
    },
    {
      provide: SELL_PRODUCT_INTERATOR,
      useClass: SellProductInterator,
    },
    {
      provide: DASHBOARD_INTERATOR,
      useClass: DashboardInterator,
    },
  ],
  exports: [
    AUTH_INTERATOR,
    WARE_HOUSE_INTERATOR,
    IMPORT_HISTORY_INTERATOR,
    SELL_PRODUCT_INTERATOR,
    DASHBOARD_INTERATOR
  ],
})
export class UseCaseModule { }
