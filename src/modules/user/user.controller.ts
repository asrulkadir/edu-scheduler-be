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
      status: 'success',
      message: 'User created',
      data: result,
    };
  }

  @Post()
  @Public()
  @HttpCode(200)
  async createUser(
    @Body() request: CreateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.createUser(request);
    return {
      status: 'success',
      message: 'User created',
      data: result,
    };
  }

  @Get(':id')
  @Public()
  @HttpCode(200)
  async getUserByUsername(
    @Param('id') id: string,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.getUserByUsername(id);
    return {
      status: 'success',
      message: 'Users found',
      data: result,
    };
  }

  @Put(':id')
  @HttpCode(200)
  async updateUser(
    @Param('id') id: string,
    @Body() request: UpdateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const updateRequest: UpdateUserRequest = {
      ...request,
      id,
    };
    const result = await this.userService.updateUser(id, updateRequest);
    return {
      status: 'success',
      message: 'User updated',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteUser(
    @Param('id') id: string,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.deleteUser(id);
    return {
      status: 'success',
      message: 'User deleted',
      data: result,
    };
  }
}
