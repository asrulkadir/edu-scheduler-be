/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/service/prisma.service';
import { ValidationService } from 'src/common/service/validation.service';
import { AcademicValidation } from './academic.validation';
import { CreateAcademicCalendarRequest } from 'src/models/schedule.model';
import { UserAuth } from 'src/models/auth.model';

@Injectable()
export class AcademicService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async validateCalendarDates(
    user: UserAuth,
    startTime: string,
    endTime: string,
    excludeId?: string,
  ) {
    // Check if start time is earlier than end time
    if (new Date(startTime) >= new Date(endTime)) {
      throw new HttpException('Start time must be earlier than end time', 400);
    }

    // Check if there is an overlapping academic calendar
    const overlappingAcademic =
      await this.prismaService.academicCalendar.findFirst({
        where: {
          clientId: user.clientId,
          OR: [
            {
              startTime: {
                lte: endTime,
              },
              endTime: {
                gte: startTime,
              },
            },
          ],
          NOT: {
            id: excludeId ? excludeId : undefined,
          },
        },
      });

    if (overlappingAcademic) {
      throw new HttpException(
        'Academic calendar with overlapping time already exists',
        400,
      );
    }
  }

  async getAcademicById(id: string) {
    this.logger.debug(`getAcademicById: id=${id}`);
    const academic = await this.prismaService.academicCalendar.findUnique({
      where: {
        id: id,
      },
    });

    if (!academic) {
      throw new HttpException('Academic calendar not found', 404);
    }

    return academic;
  }

  async getAcademics(user: UserAuth) {
    this.logger.debug(`getAcademics`);
    return await this.prismaService.academicCalendar.findMany({
      where: {
        clientId: user.clientId,
      },
    });
  }

  async getCurrentAcademic(user: UserAuth) {
    this.logger.debug(`getCurrentAcademic`);
    const currentDate = new Date();
    const academic = await this.prismaService.academicCalendar.findFirst({
      where: {
        clientId: user.clientId,
        startTime: {
          lte: currentDate,
        },
        endTime: {
          gte: currentDate,
        },
      },
    });

    if (!academic) {
      throw new HttpException('Academic calendar not found', 404);
    }

    return academic;
  }

  async createAcademic(user: UserAuth, request: CreateAcademicCalendarRequest) {
    this.logger.debug(`createAcademic: academic=${JSON.stringify(request)}`);
    const createRequest = this.validationService.validate(
      AcademicValidation.CREATE,
      request,
    );

    await this.validateCalendarDates(user, request.startTime, request.endTime);

    const academicCalendar = await this.prismaService.academicCalendar.create({
      data: {
        ...createRequest,
        clientId: user.clientId,
      },
    });

    return academicCalendar;
  }

  async updateAcademic(
    user: UserAuth,
    id: string,
    request: CreateAcademicCalendarRequest,
  ) {
    this.logger.debug(
      `updateAcademic: id=${id}, academic=${JSON.stringify(request)}`,
    );

    const newRequest = { ...request, id };
    const updateRequest = this.validationService.validate(
      AcademicValidation.UPDATE,
      newRequest,
    );

    await this.validateCalendarDates(
      user,
      request.startTime,
      request.endTime,
      id,
    );

    const academicCalendar = await this.prismaService.academicCalendar.update({
      where: {
        id: id,
      },
      data: updateRequest,
    });

    return academicCalendar;
  }

  async deleteAcademic(user: UserAuth, id: string) {
    this.logger.debug(`deleteAcademic: id=${id}`);
    const academic = this.prismaService.academicCalendar.findUnique({
      where: {
        id: id,
        clientId: user.clientId,
      },
    });

    if (!academic) {
      throw new HttpException('Academic calendar not found', 404);
    }

    return await this.prismaService.academicCalendar.delete({
      where: {
        id: id,
        clientId: user.clientId,
      },
    });
  }
}
