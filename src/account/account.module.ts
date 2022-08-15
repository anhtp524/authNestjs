import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { Account, AccountSchema } from './account.schema';
import { AccountService } from './account.service';
import { RolesGuard } from './guard/role.guard';

@Module({
  imports: [MongooseModule.forFeature([{name: Account.name,schema: AccountSchema}])],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository,],
  exports: [AccountRepository]
})
export class AccountModule {}
