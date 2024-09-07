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
import { SubjectsService } from './subjects.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { EUserRole } from 'src/utils/enum';
import { UserAuth } from 'src/models/auth.model';
import { Auth } from 'src/common/decorator/auth.decorator';
import {
  CreateSubjectsRequest,
  SubjectsResponse,
  UpdateSubjectsRequest,
} from 'src/models/subjects.model';
import { WebResponse } from 'src/models/web.model';

@Controller('api/subjects')
export class SubjectsController {
  constructor(private subjectService: SubjectsService) {}

  @Post()
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async createSubject(
    @Auth() user: UserAuth,
    @Body() request: CreateSubjectsRequest,
  ): Promise<WebResponse<SubjectsResponse>> {
    const createRequest: CreateSubjectsRequest = {
      ...request,
      clientId: user.clientId,
    };
    const result = await this.subjectService.createSubject(createRequest);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subject created',
      data: result,
    };
  }

  @Get()
  async getSubjects(
    @Auth() user: UserAuth,
  ): Promise<WebResponse<SubjectsResponse[]>> {
    const result = await this.subjectService.getSubjects(user);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subjects found',
      data: result,
    };
  }

  @Get(':id')
  async getSubject(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<SubjectsResponse>> {
    const result = await this.subjectService.getSubjectById(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subject found',
      data: result,
    };
  }

  @Put(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async updateSubject(
    @Auth() user: UserAuth,
    @Param('id') id: string,
    @Body() request: UpdateSubjectsRequest,
  ): Promise<WebResponse<SubjectsResponse>> {
    const updateRequest: UpdateSubjectsRequest = {
      ...request,
      clientId: user.clientId,
      id,
    };
    const result = await this.subjectService.updateSubject(id, updateRequest);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subject updated',
      data: result,
    };
  }

  @Delete(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async deleteSubject(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<SubjectsResponse>> {
    const result = await this.subjectService.deleteSubject(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subject deleted',
      data: result,
    };
  }
}
