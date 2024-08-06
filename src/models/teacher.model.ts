import { EGender } from 'src/utils/enum';

export class TeacherResponse {
  id: string;
  name: string;
  gender: EGender.female | EGender.male;
  profileImg: string;
  nip: string;
  phone: string;
  address: string;
  subjects: {
    id: string;
    name: string;
  }[];
}

export class CreateTeacherRequest {
  name: string;
  gender: EGender.female | EGender.male;
  profileImg?: string;
  nip: string;
  phone?: string;
  address?: string;
  subjects?: string[];
}

export class UpdateTeacherRequest {
  id: string;
  name?: string;
  gender?: EGender.female | EGender.male;
  profileImg?: string;
  nip?: string;
  phone?: string;
  address?: string;
  subjects?: string[];
}
