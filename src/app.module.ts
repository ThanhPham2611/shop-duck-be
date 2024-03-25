import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiControllerModule } from './interface/controller/controller.module';

@Module({
  imports: [
    ApiControllerModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_MONGODB)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
