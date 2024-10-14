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
import { SubjectsScheduleService } from './subjectsschedule.service';
import { Auth } from 'src/common/decorator/auth.decorator';
import { UserAuth } from 'src/models/auth.model';
import { WebResponse } from 'src/models/web.model';
import {
  CreateSubjectsScheduleRequest,
  SubjectsScheduleResponse,
  UpdateSubjectsScheduleRequest,
} from 'src/models/schedule.model';
import { Roles } from 'src/common/decorator/roles.decorator';
import { EUserRole } from 'src/utils/enum';

@Controller('api/subjects-schedule')
export class SubjectsScheduleController {
  constructor(private subjectsSchedule: SubjectsScheduleService) {}

  @Post()
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async createSubjectsSchedule(
    @Auth() user: UserAuth,
    @Body() request: CreateSubjectsScheduleRequest,
  ): Promise<WebResponse<SubjectsScheduleResponse>> {
    const createRequest: CreateSubjectsScheduleRequest = {
      ...request,
      clientId: user.clientId,
    };
    const result =
      await this.subjectsSchedule.createSubjectsSchedule(createRequest);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subjects schedule created',
      data: result,
    };
  }

  @Get()
  async getSubjectsSchedule(
    @Auth() user: UserAuth,
  ): Promise<WebResponse<SubjectsScheduleResponse[]>> {
    const result = await this.subjectsSchedule.getSubjectsSchedule(user);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subjects schedule found',
      data: result,
    };
  }

  @Get(':id')
  async getSubjectsScheduleById(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<SubjectsScheduleResponse>> {
    const result = await this.subjectsSchedule.getSubjectsScheduleById(
      user,
      id,
    );
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subjects schedule found',
      data: result,
    };
  }

  @Put(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async updateSubjectsSchedule(
    @Auth() user: UserAuth,
    @Param('id') id: string,
    @Body() request: CreateSubjectsScheduleRequest,
  ): Promise<WebResponse<SubjectsScheduleResponse>> {
    const updateRequest: UpdateSubjectsScheduleRequest = {
      ...request,
      clientId: user.clientId,
      id: id,
    };
    const result = await this.subjectsSchedule.updateSubjectsSchedule(
      id,
      updateRequest,
    );
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subjects schedule updated',
      data: result,
    };
  }

  @Delete(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async deleteSubjectsSchedule(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<SubjectsScheduleResponse>> {
    const result = await this.subjectsSchedule.deleteSubjectsSchedule(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Subjects schedule deleted',
      data: result,
    };
  }
}
