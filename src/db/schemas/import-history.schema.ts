import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Import_History {
  @Prop()
  productName: string;

  @Prop()
  importAmount: number;

  @Prop()
  importPrice: number;

  @Prop()
  importDate: Date;
}

export const ImportHistorySchema = SchemaFactory.createForClass(Import_History);
