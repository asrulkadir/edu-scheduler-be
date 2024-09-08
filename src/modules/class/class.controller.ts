/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { EUserRole } from 'src/utils/enum';
import {
  ClassResponse,
  CreateClassRequest,
  UpdateClassRequest,
} from 'src/models/class.model';
import { Auth } from 'src/common/decorator/auth.decorator';
import { UserAuth } from 'src/models/auth.model';
import { WebResponse } from 'src/models/web.model';

@Controller('api/class')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Post()
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async createClass(
    @Auth() user: UserAuth,
    @Body() request: CreateClassRequest,
  ): Promise<WebResponse<ClassResponse>> {
    const createRequest: CreateClassRequest = {
      ...request,
      clientId: user.clientId,
    };

    const result = await this.classService.createClass(createRequest);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Class created',
      data: result,
    };
  }

  @Get()
  async getClasses(
    @Auth() user: UserAuth,
  ): Promise<WebResponse<ClassResponse[]>> {
    const result = await this.classService.getClasses(user);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Classes found',
      data: result,
    };
  }

  @Get(':id')
  async getClassById(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<ClassResponse>> {
    const result = await this.classService.getClassById(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Class found',
      data: result,
    };
  }

  @Put(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async updateClass(
    @Auth() user: UserAuth,
    @Param('id') id: string,
    @Body() request: UpdateClassRequest,
  ): Promise<WebResponse<ClassResponse>> {
    const updateRequest: UpdateClassRequest = {
      ...request,
      clientId: user.clientId,
      id,
    };
    const result = await this.classService.updateClass(id, updateRequest);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Class updated',
      data: result,
    };
  }

  @Delete(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async deleteClass(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<ClassResponse>> {
    const result = await this.classService.deleteClass(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Class deleted',
      data: result,
    };
  }
}
