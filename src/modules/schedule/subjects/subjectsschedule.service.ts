/*
https://docs.nestjs.com/providers#services
*/

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/service/prisma.service';
import { ValidationService } from 'src/common/service/validation.service';
import {
  CreateSubjectsScheduleRequest,
  SubjectsScheduleResponse,
} from 'src/models/schedule.model';
import { SubjectsScheduleValidation } from './subjectsschedule.validation';
import { UserAuth } from 'src/models/auth.model';

@Injectable()
export class SubjectsScheduleService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async createSubjectsSchedule(
    request: CreateSubjectsScheduleRequest,
  ): Promise<SubjectsScheduleResponse> {
    this.logger.debug(
      `createSubjectsSchedule: request=${JSON.stringify(request)}`,
    );
    const createRequest: CreateSubjectsScheduleRequest =
      this.validationService.validate(
        SubjectsScheduleValidation.CREATE,
        request,
      );

    // check if subjects schedule already exists
    const subjectsScheduleExists =
      await this.prismaService.subjectsSchedule.findFirst({
        where: {
          subjectId: createRequest.subjectId,
          classId: createRequest.classId,
          clientId: createRequest.clientId,
          day: createRequest.day,
        },
      });

    if (subjectsScheduleExists) {
      throw new HttpException(
        'Subjects schedule already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const subjectsSchedule = await this.prismaService.subjectsSchedule.create({
      data: {
        ...createRequest,
      },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
          },
        },
        academicCalendar: {
          select: {
            id: true,
            name: true,
            startTime: true,
            endTime: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      id: subjectsSchedule.id,
      subject: subjectsSchedule.subject,
      class: subjectsSchedule.class,
      day: subjectsSchedule.day,
      startTime: subjectsSchedule.startTime,
      endTime: subjectsSchedule.endTime,
      academicCalendar: subjectsSchedule.academicCalendar,
    };
  }

  async getSubjectsSchedule(
    user: UserAuth,
  ): Promise<SubjectsScheduleResponse[]> {
    this.logger.debug(`getSubjectsSchedule`);
    const subjectsSchedule = await this.prismaService.subjectsSchedule.findMany(
      {
        where: {
          clientId: user.clientId,
        },
        include: {
          subject: {
            select: {
              id: true,
              name: true,
            },
          },
          class: {
            select: {
              id: true,
              name: true,
            },
          },
          academicCalendar: {
            select: {
              id: true,
              name: true,
              startTime: true,
              endTime: true,
            },
          },
          teacher: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          day: 'asc',
        },
      },
    );

    return subjectsSchedule;
  }
}
