/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateUserRequest,
  RegisterClientRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { UserValidation } from './user.validation';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/service/prisma.service';
import { ValidationService } from 'src/common/service/validation.service';
import { EUserRole } from 'src/utils/enum';
import { CryptoService } from 'src/common/service/crypto.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private crypto: CryptoService,
  ) {}

  async registerClient(request: RegisterClientRequest): Promise<UserResponse> {
    this.logger.debug(`registerClient: request=${JSON.stringify(request)}`);
    const createRequest: RegisterClientRequest =
      this.validationService.validate(UserValidation.REGISTER, request);

    const emailHash = this.crypto.hash(createRequest.email);

    await this.checkIfExists('username', createRequest.username);
    await this.checkIfExists('emailHash', emailHash);

    createRequest.password = await bcrypt.hash(createRequest.password, 10);
    const emailEncrypted = this.crypto.encrypt(createRequest.email);

    const client = await this.prismaService.client.create({
      data: {
        name: createRequest.clientName,
      },
    });

    delete createRequest.clientName;
    delete createRequest.email;

    const user = await this.prismaService.user.create({
      data: {
        ...createRequest,
        role: EUserRole.SuperAdmin,
        clientId: client.id,
        emailHash,
        email: emailEncrypted,
      },
    });

    return {
      username: user.username,
      email: this.crypto.decrypt(user.email),
      name: user.name,
      role: user.role,
      clientId: client.id,
    };
  }

  async createUser(request: CreateUserRequest): Promise<UserResponse> {
    this.logger.debug(`createUser: request=${JSON.stringify(request)}`);
    const createRequest: CreateUserRequest = this.validationService.validate(
      UserValidation.CREATE,
      request,
    );

    await this.checkIfExists('username', createRequest.username);
    await this.checkIfExists('email', createRequest.email);

    createRequest.password = await bcrypt.hash(createRequest.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...createRequest,
      },
    });

    return {
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      clientId: user.clientId,
    };
  }

  async getUserByUsername(username: string): Promise<UserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      clientId: user.clientId,
    };
  }

  async updateUser(
    userId: string,
    request: UpdateUserRequest,
  ): Promise<UserResponse> {
    const updateRequest: UpdateUserRequest = this.validationService.validate(
      UserValidation.UPDATE,
      request,
    );

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    if (updateRequest.username) {
      await this.checkIfExists('username', updateRequest.username);
    }

    if (updateRequest.email) {
      await this.checkIfExists('email', updateRequest.email);
    }

    if (updateRequest.password) {
      updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: updateRequest,
    });

    return {
      username: updatedUser.username,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      clientId: updatedUser.clientId,
    };
  }

  async deleteUser(userId: string): Promise<UserResponse> {
    // check if user exists
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 400);
    }

    // check if user role is super admin
    if (user.role === EUserRole.SuperAdmin) {
      throw new HttpException('Cannot delete super admin', 400);
    }

    const userDeleted = await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });

    return userDeleted;
  }

  async checkIfExists(
    property: 'username' | 'emailHash' | 'email',
    value: string,
  ) {
    this.logger.debug(`valueEmail: ${value}`);

    const existingUser = await this.prismaService.user.findFirst({
      where: {
        [property]: value,
      },
    });

    if (existingUser) {
      throw new HttpException(
        `${property === 'emailHash' ? 'Email' : 'Username'} already exists`,
        400,
      );
    }
  }
}
