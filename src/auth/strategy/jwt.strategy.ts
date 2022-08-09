import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt,Strategy } from "passport-jwt";
import { AccountRepository } from "src/account/account.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(private accountRepository: AccountRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey'
        })
    }

    async validate(payload: {sub: string}) {    
        console.log(payload);
        
        let account = await this.accountRepository.findOne(payload.sub)
        console.log(account)
        delete account.password
        return account
    }
}