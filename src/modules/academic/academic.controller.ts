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
import { AcademicService } from './academic.service';
import { WebResponse } from 'src/models/web.model';
import {
  AcademicCalendarResponse,
  CreateAcademicCalendarRequest,
} from 'src/models/schedule.model';
import { Roles } from 'src/common/decorator/roles.decorator';
import { EUserRole } from 'src/utils/enum';
import { Auth } from 'src/common/decorator/auth.decorator';
import { UserAuth } from 'src/models/auth.model';

@Controller('api/academic')
export class AcademicController {
  constructor(private AcademicService: AcademicService) {}

  @Get('current')
  @HttpCode(200)
  async getCurrentAcademics(
    @Auth() user: UserAuth,
  ): Promise<WebResponse<AcademicCalendarResponse>> {
    const result = await this.AcademicService.getCurrentAcademic(user);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Academics found',
      data: result,
    };
  }

  @Get(':id')
  async getAcademicById(
    @Param('id') id: string,
  ): Promise<WebResponse<AcademicCalendarResponse>> {
    const result = await this.AcademicService.getAcademicById(id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Academic found',
      data: result,
    };
  }

  @Get()
  async getAcademics(
    @Auth() user: UserAuth,
  ): Promise<WebResponse<AcademicCalendarResponse[]>> {
    const result = await this.AcademicService.getAcademics(user);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Academics found',
      data: result,
    };
  }

  @Post()
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async createAcademic(
    @Auth() user: UserAuth,
    @Body() request: CreateAcademicCalendarRequest,
  ): Promise<WebResponse<AcademicCalendarResponse>> {
    const result = await this.AcademicService.createAcademic(user, request);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Academic created',
      data: result,
    };
  }

  @Put(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async updateAcademic(
    @Auth() user: UserAuth,
    @Param('id') id: string,
    @Body() request: CreateAcademicCalendarRequest,
  ): Promise<WebResponse<AcademicCalendarResponse>> {
    const result = await this.AcademicService.updateAcademic(user, id, request);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Academic updated',
      data: result,
    };
  }

  @Delete(':id')
  @Roles(EUserRole.SuperAdmin, EUserRole.Admin)
  async deleteAcademic(
    @Auth() user: UserAuth,
    @Param('id') id: string,
  ): Promise<WebResponse<AcademicCalendarResponse>> {
    const result = await this.AcademicService.deleteAcademic(user, id);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Academic deleted',
      data: result,
    };
  }
}
