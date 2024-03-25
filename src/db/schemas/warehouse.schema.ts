import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Warehouse {
  @Prop()
  productName: string;

  @Prop()
  importAmount: number;

  @Prop()
  quantity: number;

  @Prop()
  importPrice: number;

  @Prop()
  price: number;

  @Prop()
  interest: number;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
