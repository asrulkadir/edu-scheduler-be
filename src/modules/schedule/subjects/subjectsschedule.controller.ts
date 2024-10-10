/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubjectsScheduleService } from './subjectsschedule.service';
import { Auth } from 'src/common/decorator/auth.decorator';
import { UserAuth } from 'src/models/auth.model';
import { WebResponse } from 'src/models/web.model';
import {
  CreateSubjectsScheduleRequest,
  SubjectsScheduleResponse,
} from 'src/models/schedule.model';

@Controller('api/subjects-schedule')
export class SubjectsScheduleController {
  constructor(private subjectsSchedule: SubjectsScheduleService) {}

  @Post()
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
}
