import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})

export class Dashboard {
  @Prop()
  totalPrice: number;

  @Prop()
  totalImportPrice: number;

  @Prop()
  totalInterest: number;
};

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);