export class ClassResponse {
  id: string;
  name: string;
  homeroomTeacher: {
    id: string;
    name: string;
  };
  subjects: {
    id: string;
    name: string;
  }[];
  students: {
    id: string;
    name: string;
  }[];
  subjectsSchedule: {
    id: string;
    name: string;
    day: string;
    start: string;
    end: string;
  }[];
}

export class CreateClassRequest {
  name: string;
  homeroomTeacherId?: string;
  subjects?: string[];
  students?: string[];
  subjectsSchedule?: {
    subjectId: string;
    day: string;
    start: string;
    end: string;
  }[];
}

export class UpdateClassRequest {
  id: string;
  name?: string;
  homeroomTeacherId?: string;
  subjects?: string[];
  students?: string[];
  subjectsSchedule?: {
    subjectId: string;
    day: string;
    start: string;
    end: string;
  }[];
}
