import { EUserRole } from 'src/utils/enum';

export class RegisterClientRequest {
  clientName: string;
  username: string;
  password: string;
  name: string;
  email: string;
}

export class CreateUserRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  role: EUserRole.Admin | EUserRole.Teacher | EUserRole.Student;
  clientId: string;
}

export class UserResponse {
  id?: string;
  username: string;
  name: string;
  email: string;
  access_token?: string;
  role: string;
  clientId: string;
}

export class UpdateUserRequest {
  id: string;
  name?: string;
  password?: string;
  username?: string;
  email?: string;
  role?: EUserRole.Admin | EUserRole.Teacher | EUserRole.Student;
}
