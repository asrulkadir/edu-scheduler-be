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
  UpdateSubjectsScheduleRequest,
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

    // check if subjects schedule is not overlapping
    const subjectsScheduleOverlapping =
      await this.prismaService.subjectsSchedule.findFirst({
        where: {
          subjectId: createRequest.subjectId,
          classId: createRequest.classId,
          clientId: createRequest.clientId,
          day: createRequest.day,
          OR: [
            {
              startTime: {
                lte: createRequest.startTime,
              },
              endTime: {
                gte: createRequest.startTime,
              },
            },
            {
              startTime: {
                lte: createRequest.endTime,
              },
              endTime: {
                gte: createRequest.endTime,
              },
            },
          ],
        },
      });

    if (subjectsScheduleOverlapping) {
      throw new HttpException(
        'Cannot create subjects schedule, overlapping schedule exists',
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

    return subjectsSchedule;
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

  async getSubjectsScheduleById(
    user: UserAuth,
    id: string,
  ): Promise<SubjectsScheduleResponse> {
    this.logger.debug(`getSubjectsScheduleById: id=${id}`);
    const subjectsSchedule =
      await this.prismaService.subjectsSchedule.findUnique({
        where: {
          clientId: user.clientId,
          id,
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

    return subjectsSchedule;
  }

  async updateSubjectsSchedule(
    id: string,
    request: UpdateSubjectsScheduleRequest,
  ): Promise<SubjectsScheduleResponse> {
    this.logger.debug(
      `updateSubjectsSchedule: id=${id}, request=${JSON.stringify(request)}`,
    );

    const newRequest = { ...request, id };
    const updateRequest: CreateSubjectsScheduleRequest =
      this.validationService.validate(
        SubjectsScheduleValidation.UPDATE,
        newRequest,
      );

    // check if subjects schedule exists
    const subjectsScheduleExists =
      await this.prismaService.subjectsSchedule.findUnique({
        where: {
          clientId: updateRequest.clientId,
          id,
        },
      });

    if (!subjectsScheduleExists) {
      throw new HttpException(
        'Subjects schedule not found',
        HttpStatus.NOT_FOUND,
      );
    }

    // check if subjects schedule is not overlapping
    const subjectsScheduleOverlapping =
      await this.prismaService.subjectsSchedule.findFirst({
        where: {
          subjectId: updateRequest.subjectId,
          classId: updateRequest.classId,
          clientId: updateRequest.clientId,
          day: updateRequest.day,
          OR: [
            {
              startTime: {
                lte: updateRequest.startTime,
              },
              endTime: {
                gte: updateRequest.startTime,
              },
            },
            {
              startTime: {
                lte: updateRequest.endTime,
              },
              endTime: {
                gte: updateRequest.endTime,
              },
            },
          ],
          NOT: {
            id,
          },
        },
      });

    if (subjectsScheduleOverlapping) {
      throw new HttpException(
        'Cannot update subjects schedule, overlapping schedule exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const subjectsSchedule = await this.prismaService.subjectsSchedule.update({
      where: {
        clientId: updateRequest.clientId,
        id,
      },
      data: updateRequest,
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

    return subjectsSchedule;
  }

  async deleteSubjectsSchedule(user: UserAuth, id: string) {
    this.logger.debug(`deleteSubjectsSchedule: id=${id}`);
    const subjectsSchedule = this.prismaService.subjectsSchedule.findUnique({
      where: {
        clientId: user.clientId,
        id,
      },
    });

    if (!subjectsSchedule) {
      throw new HttpException(
        'Subjects schedule not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const subjectsScheduleDeleted =
      await this.prismaService.subjectsSchedule.delete({
        where: {
          clientId: user.clientId,
          id,
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

    return subjectsScheduleDeleted;
  }
}
