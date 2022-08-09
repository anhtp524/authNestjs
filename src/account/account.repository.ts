import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account, AccountDocument } from "./account.schema";
import { CreatAccountDto } from "./dto/account.dto";

@Injectable()
export class AccountRepository {
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument> ) {}

    async createAccount(account: Account): Promise<Account> {
        let newAccount = new this.accountModel(account)
        return newAccount.save()
    }

    async findAll(): Promise<Account[]> {
        return this.accountModel.find().exec()
    }

    async findOne(_username: string): Promise<Account> {
        return this.accountModel.findOne({username: _username}).lean()
    }

    async updateAccount(id: string, accountUpdate: CreatAccountDto): Promise<Account> {
        let newAccount = {
            ...accountUpdate
        }

        return this.accountModel.findByIdAndUpdate(id, newAccount).exec()
    }

    async deleteAccount(id): Promise<Account> {
        return this.accountModel.findByIdAndDelete(id).exec()
    }


}