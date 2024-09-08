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
  ClassResponse,
  CreateClassRequest,
  UpdateClassRequest,
} from 'src/models/class.model';
import { ClassValidation } from './class.validation';
import { UserAuth } from 'src/models/auth.model';

@Injectable()
export class ClassService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async createClass(request: CreateClassRequest): Promise<ClassResponse> {
    this.logger.debug(`createClass: request=${JSON.stringify(request)}`);
    const createRequest: CreateClassRequest = this.validationService.validate(
      ClassValidation.CREATE,
      request,
    );

    // check if class name already exists
    const classNameExists = await this.prismaService.class.findFirst({
      where: {
        name: createRequest.name,
        clientId: createRequest.clientId,
      },
    });

    if (classNameExists) {
      throw new HttpException(
        'Class name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const className = await this.prismaService.class.create({
      data: {
        ...createRequest,
        students: {
          connect: createRequest.students?.map((studentId) => ({
            id: studentId,
          })),
        },
        subjects: {
          connect: createRequest.subjects?.map((subjectId) => ({
            id: subjectId,
          })),
        },
        subjectsSchedule: {
          connect: createRequest.subjectsSchedule?.map((scheduleId) => ({
            id: scheduleId,
          })),
        },
      },
      include: {
        homeroomTeacher: {
          select: {
            id: true,
            name: true,
          },
        },
        students: {
          select: {
            id: true,
            name: true,
          },
        },
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
        subjectsSchedule: {
          select: {
            id: true,
            days: true,
            startTime: true,
            endTime: true,
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return className;
  }

  async getClasses(user: UserAuth): Promise<ClassResponse[]> {
    this.logger.debug('getClasses');
    const classes = await this.prismaService.class.findMany({
      where: {
        clientId: user.clientId,
      },
      include: {
        homeroomTeacher: {
          select: {
            id: true,
            name: true,
          },
        },
        students: {
          select: {
            id: true,
            name: true,
          },
        },
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
        subjectsSchedule: {
          select: {
            id: true,
            days: true,
            startTime: true,
            endTime: true,
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return classes;
  }

  async getClassById(user: UserAuth, classId: string): Promise<ClassResponse> {
    this.logger.debug(`getClassById: classId=${classId}`);
    // check if class is exist
    const classExists = await this.prismaService.class.findUnique({
      where: {
        id: classId,
        clientId: user.clientId,
      },
    });

    if (!classExists) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }

    const className = await this.prismaService.class.findUnique({
      where: {
        id: classId,
      },
      include: {
        homeroomTeacher: {
          select: {
            id: true,
            name: true,
          },
        },
        students: {
          select: {
            id: true,
            name: true,
          },
        },
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
        subjectsSchedule: {
          select: {
            id: true,
            days: true,
            startTime: true,
            endTime: true,
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return className;
  }

  async updateClass(
    classId: string,
    request: UpdateClassRequest,
  ): Promise<ClassResponse> {
    this.logger.debug(`updateClass: request=${JSON.stringify(request)}`);
    const updateRequest: UpdateClassRequest = this.validationService.validate(
      ClassValidation.UPDATE,
      request,
    );

    // check if class is exist
    const classExists = await this.prismaService.class.findUnique({
      where: {
        id: classId,
      },
    });

    if (!classExists) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }

    const className = await this.prismaService.class.update({
      where: {
        id: classId,
      },
      data: {
        ...updateRequest,
        students: {
          connect: updateRequest.students?.map((studentId) => ({
            id: studentId,
          })),
        },
        subjects: {
          connect: updateRequest.subjects?.map((subjectId) => ({
            id: subjectId,
          })),
        },
        subjectsSchedule: {
          connect: updateRequest.subjectsSchedule?.map((scheduleId) => ({
            id: scheduleId,
          })),
        },
      },
      include: {
        homeroomTeacher: {
          select: {
            id: true,
            name: true,
          },
        },
        students: {
          select: {
            id: true,
            name: true,
          },
        },
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
        subjectsSchedule: {
          select: {
            id: true,
            days: true,
            startTime: true,
            endTime: true,
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return className;
  }

  async deleteClass(user: UserAuth, classId: string): Promise<ClassResponse> {
    this.logger.debug(`deleteClass: classId=${classId}`);
    // check if class is exist
    const classExists = await this.prismaService.class.findUnique({
      where: {
        id: classId,
        clientId: user.clientId,
      },
    });

    if (!classExists) {
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    }

    const className = await this.prismaService.class.delete({
      where: {
        id: classId,
      },
      include: {
        homeroomTeacher: {
          select: {
            id: true,
            name: true,
          },
        },
        students: {
          select: {
            id: true,
            name: true,
          },
        },
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
        subjectsSchedule: {
          select: {
            id: true,
            days: true,
            startTime: true,
            endTime: true,
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return className;
  }
}
