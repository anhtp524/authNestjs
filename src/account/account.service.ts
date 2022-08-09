import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreatAccountDto } from './dto/account.dto';
import * as bcrypt from 'bcrypt'
import { Account } from './account.schema';



@Injectable()
export class AccountService {
    constructor(private readonly accountRepository: AccountRepository) {}


    async creatAccount(account: CreatAccountDto) {
        account.password = await bcrypt.hash(account.password, 10)
        return this.accountRepository.createAccount(account)
    }

    async getAllAccount() {
        return this.accountRepository.findAll()
    }

    async getAccountById(username: string)  {
        return this.accountRepository.findOne(username)
    }

    async updateAccount(id: string, accountUpdate: CreatAccountDto) {
        return this.accountRepository.updateAccount(id, accountUpdate)
    }

    async deleteAccount(id) {
        return this.accountRepository.deleteAccount(id)
    }

    async testLogin(account: Account) {
        let user = await this.accountRepository.findOne(account.username)
        
        let check = await bcrypt.compare(account.password,user.password)

        return check
    }
}
