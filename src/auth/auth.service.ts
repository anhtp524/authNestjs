import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountRepository } from 'src/account/account.repository';
import { CreatAccountDto } from 'src/account/dto/account.dto';
import { SignInDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private accountRepository: AccountRepository, private jwtservice: JwtService) {}

    async signin(acc: SignInDto) {
        const account =  await this.accountRepository.findOneByUsername(acc.username)
        if(!account){
            throw new UnauthorizedException("Account does not exist")
        }

        const check = await bcrypt.compare(acc.password, account.password)
        if(!check) throw new UnauthorizedException("Password is wrong")

        return this.signToken(acc)
    }

    signup(newAcc: CreatAccountDto) {

    }

    async signToken(acc: SignInDto) {
        const payload = {sub: acc.username}

        const token = await this.jwtservice.sign(payload , {expiresIn : '5m'})

        return {
            access_token: token,
        }
    }
}
