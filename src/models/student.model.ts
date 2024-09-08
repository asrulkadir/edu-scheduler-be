import { Gender } from '@prisma/client';

export class StudentResponse {
  id: string;
  name: string;
  gender: Gender;
  profileImg: string;
  nis: string;
  class: {
    id: string;
    name: string;
  };
}

export class CreateStudentRequest {
  clientId: string;
  name: string;
  gender: Gender;
  profileImg?: string;
  nis: string;
  classId: string;
}

export class UpdateStudentRequest {
  id: string;
  clientId: string;
  name?: string;
  gender?: Gender;
  profileImg?: string;
  nis?: string;
  classId?: string;
}
