import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import { CreatAccountDto } from './dto/account.dto';
import { Request } from 'express';


@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}
    @Post()
    createAccount(@Body() account: CreatAccountDto) {
        return this.accountService.creatAccount(account)
    }

    @Get()
    getAll() {
        return this.accountService.getAllAccount()
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.accountService.getAccountById(id)
    }

    @Put(':id')
    update(@Param('id') id: string, account: CreatAccountDto) {
        return this.accountService.updateAccount(id,account)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.accountService.deleteAccount(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('info')
    getInfo(@Req() req: Request) {
        return req.user
    }
    
}
