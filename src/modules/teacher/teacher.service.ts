/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/service/prisma.service';
import { ValidationService } from 'src/common/service/validation.service';
import {
  CreateTeacherRequest,
  TeacherResponse,
  UpdateTeacherRequest,
} from 'src/models/teacher.model';
import { TeacherValidation } from './teacher.validation';
import { UserAuth } from 'src/models/auth.model';

@Injectable()
export class TeacherService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async createTeacher(request: CreateTeacherRequest): Promise<TeacherResponse> {
    this.logger.debug(`createTeacher: request=${JSON.stringify(request)}`);
    const createRequest: CreateTeacherRequest = this.validationService.validate(
      TeacherValidation.CREATE,
      request,
    );

    const teacher = await this.prismaService.teacher.create({
      data: {
        ...createRequest,
        subjects: {
          connect: createRequest.subjects?.map((subjectId) => ({
            id: subjectId,
          })),
        },
      },
      include: {
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return teacher;
  }

  async getTeachers(user: UserAuth): Promise<TeacherResponse[]> {
    const teachers = await this.prismaService.teacher.findMany({
      where: {
        clientId: user.clientId,
      },
      include: {
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return teachers;
  }

  async getTeacherById(user: UserAuth, id: string): Promise<TeacherResponse> {
    const teacher = await this.prismaService.teacher.findFirst({
      where: {
        clientId: user.clientId,
        id,
      },
      include: {
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!teacher) {
      throw new HttpException('Teacher not found', 404);
    }

    return teacher;
  }

  async updateTeacher(
    user: UserAuth,
    id: string,
    request: UpdateTeacherRequest,
  ): Promise<TeacherResponse> {
    this.logger.debug(`updateTeacher: request=${JSON.stringify(request)}`);
    const updateRequest: UpdateTeacherRequest = this.validationService.validate(
      TeacherValidation.UPDATE,
      request,
    );

    // check if teacher exists
    const teacherExists = await this.prismaService.teacher.findFirst({
      where: {
        id,
        clientId: user.clientId,
      },
    });

    if (!teacherExists) {
      throw new HttpException('Teacher not found', 404);
    }

    const subjectsConnection = updateRequest.subjects?.map((subjectId) => ({
      id: subjectId,
    }));

    const teacher = await this.prismaService.teacher.update({
      where: {
        id,
        clientId: user.clientId,
      },
      data: {
        ...updateRequest,
        subjects: {
          set: subjectsConnection,
        },
      },
      include: {
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return teacher;
  }

  async deleteTeacher(user: UserAuth, id: string): Promise<TeacherResponse> {
    // check if teacher exists
    const teacher = await this.prismaService.teacher.findFirst({
      where: {
        id,
        clientId: user.clientId,
      },
    });

    if (!teacher) {
      throw new HttpException('Teacher not found', 404);
    }

    return await this.prismaService.teacher.delete({
      where: {
        id,
      },
    });
  }
}
