import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Sell_Product {
  @Prop()
  productName: string;

  @Prop()
  sellAmount: number;

  @Prop()
  importPrice: number;

  @Prop()
  price: number;

  @Prop()
  interest: number;
}

export const SellProductSchema = SchemaFactory.createForClass(Sell_Product);
