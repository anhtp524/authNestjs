import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';

@Module({
  imports: [
    AccountModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/demo'), 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load: [config]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
