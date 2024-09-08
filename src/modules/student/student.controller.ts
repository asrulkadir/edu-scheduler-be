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
import { StudentService } from './student.service';
import { EUserRole } from 'src/utils/enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UserAuth } from 'src/models/auth.model';
import { Auth } from 'src/common/decorator/auth.decorator';
import { WebResponse } from 'src/models/web.model';
import {
  CreateStudentRequest,
  StudentResponse,
  UpdateStudentRequest,
} from 'src/models/student.model';

@Controller('api/student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async createStudent(
    @Auth() user: UserAuth,
    @Body() request: CreateStudentRequest,
  ): Promise<WebResponse<StudentResponse>> {
    const createRequest: CreateStudentRequest = {
      ...request,
      clientId: user.clientId,
    };
    const result = await this.studentService.createStudent(createRequest);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Student created',
      data: result,
    };
  }

  @Get()
  async getStudents(
    @Auth() user: UserAuth,
  ): Promise<WebResponse<StudentResponse[]>> {
    const result = await this.studentService.getStudents(user);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Students found',
      data: result,
    };
  }

  @Get(':id')
  async getStudent(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<StudentResponse>> {
    const result = await this.studentService.getStudentById(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Student found',
      data: result,
    };
  }

  @Put(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async updateStudent(
    @Auth() user: UserAuth,
    @Param('id') id: string,
    @Body() request: UpdateStudentRequest,
  ): Promise<WebResponse<StudentResponse>> {
    const updateRequest: UpdateStudentRequest = {
      ...request,
      clientId: user.clientId,
      id,
    };
    const result = await this.studentService.updateStudent(user, updateRequest);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Student updated',
      data: result,
    };
  }

  @Delete(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async deleteStudent(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<StudentResponse>> {
    const result = await this.studentService.deleteStudent(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Student deleted',
      data: result,
    };
  }
}
