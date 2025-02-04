import { Controller, Get, Req, Post, Body, Param } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Request } from 'express';
import { copyFileSync } from 'fs';
import { signUpDTO, signInDTO } from './dto/auth-dto';

@Controller('auth')
export class AuthenticationController {

    constructor(private authService: AuthenticationService) { }

    @Post('/register')
    registerUser(@Body() body: signUpDTO) {
        let data = body;
        return this.authService.register(data);
    }

    @Post('/signin')
    userSignIn(@Body() body: signInDTO) {
        let data = body;
        return this.authService.signIn(data);
    }


}
