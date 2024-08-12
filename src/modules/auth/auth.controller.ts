import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/public.decorator';
import { LoginRequest } from 'src/models/auth.model';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private setCookie(res: Response, name: string, value: string, options = {}) {
    const defaultOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires in 1 day
      sameSite: 'strict' as const,
      secure: true,
    };

    res.cookie(name, value, { ...defaultOptions, ...options });
  }

  @Post('login')
  @HttpCode(200)
  @Public()
  async login(
    @Body() request: LoginRequest,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.authService.signIn(request);
    // set cookies using the helper function
    this.setCookie(res, 'session', result.access_token);
    this.setCookie(res, 'role', result.role, { httpOnly: false });

    res.send({
      statusCode: 200,
      status: 'success',
      message: 'Login successful',
      data: result,
    });
  }

  @Post('logout')
  @HttpCode(200)
  @Public()
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('session');
    res.clearCookie('role');
    res.send({
      statusCode: 200,
      status: 'success',
      message: 'Logout successful',
    });
  }
}
