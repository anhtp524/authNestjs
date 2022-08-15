import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountRepository } from 'src/account/account.repository';
import { Account, AccountSchema } from 'src/account/account.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{name: Account.name,schema: AccountSchema}]), JwtModule.register({secret: "secretKey"})],
  controllers: [AuthController],
  providers: [AuthService, AccountRepository, JwtStrategy]
})
export class AuthModule {}
