import { Body, Controller, Post } from '@nestjs/common';
import { CreatAccountDto } from 'src/account/dto/account.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async signin(@Body() acc: SignInDto) {
        return this.authService.signin(acc)
    }

    @Post('regester')
    signup(@Body() newAcc: CreatAccountDto) {
        return this.authService.signup(newAcc)
    }
}
