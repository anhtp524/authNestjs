import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreatAccountDto } from './dto/account.dto';
import * as bcrypt from 'bcrypt'

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

    async getAccountById(id: string)  {
        let account = await this.accountRepository.findOneById(id)
        
        return this.accountRepository.findOneById(id)
    }

    async updateAccount(id: string, accountUpdate: CreatAccountDto) {
        accountUpdate.password = await bcrypt.hash(accountUpdate.password, 10)
        return this.accountRepository.updateAccount(id, accountUpdate)
    }

    async deleteAccount(id) {
        return this.accountRepository.deleteAccount(id)
    }
}
