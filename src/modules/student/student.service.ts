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
  CreateStudentRequest,
  StudentResponse,
  UpdateStudentRequest,
} from 'src/models/student.model';
import { StudentValidation } from './student.validation';
import { UserAuth } from 'src/models/auth.model';

@Injectable()
export class StudentService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async createStudent(request: CreateStudentRequest): Promise<StudentResponse> {
    this.logger.debug(`createTeacher: request=${JSON.stringify(request)}`);
    const createRequest: CreateStudentRequest = this.validationService.validate(
      StudentValidation.CREATE,
      request,
    );

    // check if nis already exists
    const studentNisExists = await this.prismaService.student.findFirst({
      where: {
        nis: createRequest.nis,
        clientId: createRequest.clientId,
      },
    });

    if (studentNisExists) {
      throw new HttpException('NIS already exists', HttpStatus.BAD_REQUEST);
    }

    const student = await this.prismaService.student.create({
      data: {
        ...createRequest,
      },
      include: {
        class: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return student;
  }

  async getStudents(user: UserAuth): Promise<StudentResponse[]> {
    const students = await this.prismaService.student.findMany({
      where: {
        clientId: user.clientId,
      },
      include: {
        class: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return students;
  }

  async getStudentById(user: UserAuth, id: string): Promise<StudentResponse> {
    const student = await this.prismaService.student.findUnique({
      where: {
        id,
        clientId: user.clientId,
      },
      include: {
        class: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    return student;
  }

  async updateStudent(
    user: UserAuth,
    request: UpdateStudentRequest,
  ): Promise<StudentResponse> {
    this.logger.debug(`updateStudent: request=${JSON.stringify(request)}`);
    const updateRequest: UpdateStudentRequest = this.validationService.validate(
      StudentValidation.UPDATE,
      request,
    );

    // check if student is exist
    const studentExists = await this.prismaService.student.findUnique({
      where: {
        id: updateRequest.id,
        clientId: user.clientId,
      },
    });

    if (!studentExists) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    if (updateRequest.nis) {
      // check if nis already exists
      const studentNisExists = await this.prismaService.student.findFirst({
        where: {
          nis: updateRequest.nis,
          clientId: user.clientId,
          NOT: {
            id: updateRequest.id,
          },
        },
      });

      if (studentNisExists) {
        throw new HttpException('NIS already exists', HttpStatus.BAD_REQUEST);
      }
    }

    const student = await this.prismaService.student.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
      },
      include: {
        class: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return student;
  }

  async deleteStudent(user: UserAuth, id: string): Promise<StudentResponse> {
    const student = await this.prismaService.student.findUnique({
      where: {
        id,
        clientId: user.clientId,
      },
      include: {
        class: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.student.delete({
      where: {
        id,
      },
    });

    return student;
  }
}
