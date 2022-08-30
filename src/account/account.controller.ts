import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import { CreatAccountDto } from './dto/account.dto';
import { Request } from 'express';
import { Role } from './enum/role.enum';
import { RolesGuard } from './guard/role.guard';
import { ConfigService } from '@nestjs/config';


@Controller('account')
//@UseGuards(AuthGuard('jwt'))
export class AccountController {
    constructor(private readonly accountService: AccountService, private configService: ConfigService) {}
    

    @Post()
    createAccount(@Body() account: CreatAccountDto) {
        
        return this.accountService.creatAccount(account)
    }

    @Get()
    getAll() {
        const secret = this.configService.get("jwtSecret")
        return secret
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
    async update(@Param('id') id: string,@Body() account: CreatAccountDto) {
        return await this.accountService.updateAccount(id,account)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.accountService.deleteAccount(id)
    }
    
}
