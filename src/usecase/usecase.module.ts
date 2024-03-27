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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Warehouse', schema: WarehouseSchema },
      { name: 'Import_History', schema: ImportHistorySchema },
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
  ],
  exports: [AUTH_INTERATOR, WARE_HOUSE_INTERATOR, IMPORT_HISTORY_INTERATOR],
})
export class UseCaseModule { }
