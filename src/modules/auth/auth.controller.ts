/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/public.decorator';
import { LoginRequest } from 'src/models/auth.model';
import { Response } from 'express'; // Import the Response type from 'express'

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  async login(
    @Body() request: LoginRequest,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.authService.signIn(request);
    // set cookie
    res.cookie('auth', result.access_token, {
      httpOnly: true,
      // expires in 1 day
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      secure: true,
    });
    res.send({
      status: 'success',
      message: 'Login successful',
      data: result,
    });
  }
}
