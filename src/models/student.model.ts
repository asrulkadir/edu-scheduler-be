import { EGender } from 'src/utils/enum';

export class StudentResponse {
  id: string;
  name: string;
  gender: EGender.female | EGender.male;
  profileImg: string;
  nis: string;
  class: {
    id: string;
    name: string;
  };
}

export class CreateStudentRequest {
  name: string;
  gender: EGender.female | EGender.male;
  profileImg?: string;
  nis: string;
  classId: string;
}

export class UpdateStudentRequest {
  id: string;
  name?: string;
  gender?: EGender.female | EGender.male;
  profileImg?: string;
  nis?: string;
  classId?: string;
}
