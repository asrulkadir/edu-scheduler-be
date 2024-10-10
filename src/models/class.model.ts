export class ClassResponse {
  id: string;
  name: string;
  clientId: string;
  description?: string;
  homeroomTeacher?: {
    id: string;
    name: string;
  };
  subjects?: {
    id: string;
    name: string;
  }[];
  students?: {
    id: string;
    name: string;
  }[];
  subjectsSchedule?: {
    id: string;
    day: string;
    startTime: string | Date;
    endTime: string | Date;
    subject: {
      id: string;
      name: string;
    };
  }[];
}

export class CreateClassRequest {
  name: string;
  clientId: string;
  description?: string;
  homeroomTeacherId?: string;
  subjects?: string[];
  students?: string[];
  subjectsSchedule?: string[];
}

export class UpdateClassRequest {
  id: string;
  clientId: string;
  name?: string;
  description?: string;
  homeroomTeacherId?: string;
  subjects?: string[];
  students?: string[];
  subjectsSchedule?: string[];
}
