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
import { TeacherService } from './teacher.service';
import {
  CreateTeacherRequest,
  TeacherResponse,
  UpdateTeacherRequest,
} from 'src/models/teacher.model';
import { Auth } from 'src/common/decorator/auth.decorator';
import { UserAuth } from 'src/models/auth.model';
import { WebResponse } from 'src/models/web.model';
import { Roles } from 'src/common/decorator/roles.decorator';
import { EUserRole } from 'src/utils/enum';

@Controller('api/teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post()
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async createTeacher(
    @Auth() user: UserAuth,
    @Body() request: CreateTeacherRequest,
  ): Promise<WebResponse<TeacherResponse>> {
    const createRequest: CreateTeacherRequest = {
      ...request,
      clientId: user.clientId,
    };
    const result = await this.teacherService.createTeacher(createRequest);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Teacher created',
      data: result,
    };
  }

  @Get()
  async getTeachers(
    @Auth() user: UserAuth,
  ): Promise<WebResponse<TeacherResponse[]>> {
    const result = await this.teacherService.getTeachers(user);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Teachers found',
      data: result,
    };
  }

  @Get(':id')
  async getTeacherById(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<TeacherResponse>> {
    const result = await this.teacherService.getTeacherById(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Teacher found',
      data: result,
    };
  }

  @Put(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async updateTeacher(
    @Auth() user: UserAuth,
    @Param('id') id: string,
    @Body() request: UpdateTeacherRequest,
  ): Promise<WebResponse<TeacherResponse>> {
    const updateRequest: UpdateTeacherRequest = {
      ...request,
      id,
    };
    const result = await this.teacherService.updateTeacher(
      user,
      id,
      updateRequest,
    );
    return {
      statusCode: 200,
      status: 'success',
      message: 'Teacher updated',
      data: result,
    };
  }

  @Delete(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async deleteTeacher(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<TeacherResponse>> {
    const result = await this.teacherService.deleteTeacher(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Teacher deleted',
      data: result,
    };
  }
}
