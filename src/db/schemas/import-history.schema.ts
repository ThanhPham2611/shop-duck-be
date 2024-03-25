import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Import_History {
  @Prop()
  productName: string;

  @Prop()
  importAmount: number;
}

export const ImportHistorySchema = SchemaFactory.createForClass(Import_History);
