import { Gender } from '@prisma/client';

export class TeacherResponse {
  id: string;
  name: string;
  gender: Gender;
  clientId: string;
  profileImg?: string;
  nip: string;
  phone?: string;
  address?: string;
  subjects?: {
    id: string;
    name: string;
  }[];
}

export class CreateTeacherRequest {
  name: string;
  gender: Gender;
  clientId: string;
  profileImg?: string;
  nip: string;
  phone?: string;
  address?: string;
  subjects?: string[];
}

export class UpdateTeacherRequest {
  id: string;
  name?: string;
  gender?: Gender;
  profileImg?: string;
  nip?: string;
  phone?: string;
  address?: string;
  subjects?: string[];
}
