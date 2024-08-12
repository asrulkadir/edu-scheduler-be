/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/common/decorator/public.decorator';
import {
  CreateUserRequest,
  RegisterClientRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/models/user.model';
import { WebResponse } from 'src/models/web.model';
import { Auth } from 'src/common/decorator/auth.decorator';
import { UserAuth } from 'src/models/auth.model';
import { Roles } from 'src/common/decorator/roles.decorator';
import { EUserRole } from 'src/utils/enum';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @Public()
  @HttpCode(200)
  async registerClient(
    @Body() request: RegisterClientRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.registerClient(request);
    return {
      statusCode: 200,
      status: 'success',
      message: 'User created',
      data: result,
    };
  }

  @Post()
  @HttpCode(200)
  async createUser(
    @Auth() user: UserAuth,
    @Body() request: CreateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.createUser(user, request);
    return {
      statusCode: 200,
      status: 'success',
      message: 'User created',
      data: result,
    };
  }

  @Get('current')
  @HttpCode(200)
  async getCurrentUser(
    @Auth() user: UserAuth,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.getCurrentUser(user);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Users found',
      data: result,
    };
  }

  @Put('current')
  @HttpCode(200)
  async updateCurrentUser(
    @Auth() user: UserAuth,
    @Body() request: UpdateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.updateCurrentUser(user, request);
    return {
      statusCode: 200,
      status: 'success',
      message: 'User updated',
      data: result,
    };
  }

  @Get()
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  @HttpCode(200)
  async getUsers(@Auth() user: UserAuth): Promise<WebResponse<UserResponse[]>> {
    const result = await this.userService.getUsers(user);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Users found',
      data: result,
    };
  }

  @Get(':id')
  @HttpCode(200)
  async getUserByUsername(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.getUserByUsername(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Users found',
      data: result,
    };
  }

  @Put(':id')
  @Roles(EUserRole.SuperAdmin)
  @HttpCode(200)
  async updateUser(
    @Auth() user: UserAuth,
    @Param('id') id: string,
    @Body() request: UpdateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const updateRequest: UpdateUserRequest = {
      ...request,
      id,
    };
    const result = await this.userService.updateUser(user, id, updateRequest);
    return {
      statusCode: 200,
      status: 'success',
      message: 'User updated',
      data: result,
    };
  }

  @Delete(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  @HttpCode(200)
  async deleteUser(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.deleteUser(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'User deleted',
      data: result,
    };
  }
}
