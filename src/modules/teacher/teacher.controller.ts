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

@Controller('api/teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post()
  async createTeacher(
    @Auth() user: UserAuth,
    @Body() request: CreateTeacherRequest,
  ): Promise<WebResponse<TeacherResponse>> {
    const result = await this.teacherService.createTeacher(user, request);
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
  async updateTeacher(
    @Auth() user: UserAuth,
    @Param('id') id: string,
    @Body() request: UpdateTeacherRequest,
  ): Promise<WebResponse<TeacherResponse>> {
    const result = await this.teacherService.updateTeacher(user, id, request);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Teacher updated',
      data: result,
    };
  }

  @Delete(':id')
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
