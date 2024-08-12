/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/service/prisma.service';
import { ValidationService } from 'src/common/service/validation.service';
import { LoginRequest, UserAuth } from 'src/models/auth.model';
import { UserResponse } from 'src/models/user.model';
import { AuthValidation } from './auth.validation';
import { CryptoService } from 'src/common/service/crypto.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private crypto: CryptoService,
  ) {}

  async signIn(request: LoginRequest): Promise<UserResponse> {
    const loginRequest: LoginRequest = this.validationService.validate(
      AuthValidation.LOGIN,
      request,
    );

    const user = await this.prismaService.user.findFirst({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new HttpException('Username or password is incorrect', 400);
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Username or password is invalid', 400);
    }

    const payload: UserAuth = {
      id: user.id,
      username: user.username,
      clientId: user.clientId,
      role: user.role,
      email: this.crypto.decrypt(user.email),
      name: user.name,
    };

    const token = await this.jwtService.signAsync(payload);
    const tokenEncrypted = this.crypto.encrypt(token);

    this.logger.debug(`User have logged in: ${payload.username}`);

    return {
      access_token: tokenEncrypted,
      ...payload,
    };
  }
}
