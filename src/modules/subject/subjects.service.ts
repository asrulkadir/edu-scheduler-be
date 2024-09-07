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
  CreateSubjectsRequest,
  SubjectsResponse,
  UpdateSubjectsRequest,
} from 'src/models/subjects.model';
import { SubjectsValidation } from './subjects.validation';
import { UserAuth } from 'src/models/auth.model';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async createSubject(
    request: CreateSubjectsRequest,
  ): Promise<SubjectsResponse> {
    this.logger.debug(`createSubject: request=${JSON.stringify(request)}`);
    const createRequest: CreateSubjectsRequest =
      this.validationService.validate(SubjectsValidation.CREATE, request);

    const teacherConnection = createRequest.teachers?.map((teacherId) => ({
      id: teacherId,
    }));

    const subject = await this.prismaService.subject.create({
      data: {
        ...createRequest,
        teacher: {
          connect: teacherConnection,
        },
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return subject;
  }

  async getSubjects(user: UserAuth): Promise<SubjectsResponse[]> {
    const subjects = await this.prismaService.subject.findMany({
      where: {
        clientId: user.clientId,
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return subjects;
  }

  async getSubjectById(
    user: UserAuth,
    subjectId: string,
  ): Promise<SubjectsResponse> {
    const subject = await this.prismaService.subject.findUnique({
      where: {
        id: subjectId,
        clientId: user.clientId,
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!subject) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }

    return subject;
  }

  async updateSubject(
    subjectId: string,
    request: UpdateSubjectsRequest,
  ): Promise<SubjectsResponse> {
    this.logger.debug(`updateSubject: request=${JSON.stringify(request)}`);
    const updateRequest: UpdateSubjectsRequest =
      this.validationService.validate(SubjectsValidation.UPDATE, request);

    // Check if subject exists
    const subjectExists = await this.prismaService.subject.findFirst({
      where: {
        id: subjectId,
      },
    });

    if (!subjectExists) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }

    const teacherConnection = updateRequest.teachers?.map((teacherId) => ({
      id: teacherId,
    }));

    const subject = await this.prismaService.subject.update({
      where: {
        id: subjectId,
      },
      data: {
        ...updateRequest,
        teacher: {
          set: teacherConnection,
        },
      },
    });

    return subject;
  }

  async deleteSubject(
    user: UserAuth,
    subjectId: string,
  ): Promise<SubjectsResponse> {
    // check if subject exists
    const subjectExists = await this.prismaService.subject.findFirst({
      where: {
        id: subjectId,
        clientId: user.clientId,
      },
    });

    if (!subjectExists) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.subject.delete({
      where: {
        id: subjectId,
      },
    });
  }
}
