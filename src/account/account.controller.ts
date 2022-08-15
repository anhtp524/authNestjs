import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import { CreatAccountDto } from './dto/account.dto';
import { Request } from 'express';
import { Role } from './enum/role.enum';
import { RolesGuard } from './guard/role.guard';


@Controller('account')
@UseGuards(AuthGuard('jwt'))
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
    
    // Để trên Get(Id) bởi vì id là param vào thuộc kiểu string nên để dưới sẽ lỗi
    @Get('info')
    @UseGuards(new RolesGuard(Role.admin))
    getInfo(@Req() req: Request) {
        return req.user
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
    
}
