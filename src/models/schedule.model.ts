// teaching schedule model
type TDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
export class TeachingScheduleResponse {
  id: string;
  subject: {
    id: string;
    name: string;
  };
  teacher: {
    id: string;
    name: string;
  };
  day: TDay;
  startTime: string;
  endTime: string;
}

export class CreateTeachingScheduleRequest {
  subjectId: string;
  teacherId: string;
  day: TDay;
  startTime: string;
  endTime: string;
}

export class UpdateTeachingScheduleRequest {
  id: string;
  subjectId?: string;
  teacherId?: string;
  day?: TDay;
  startTime?: string;
  endTime?: string;
}

// subjects schedule model
export class SubjectsScheduleResponse {
  id: string;
  subject: {
    id: string;
    name: string;
  };
  day: TDay;
  startTime: string | Date;
  endTime: string | Date;
  teacher?: {
    id: string;
    name: string;
  };
  class: {
    id: string;
    name: string;
  };
  teachingSchedule?: {
    id: string;
    day: TDay;
    startTime: string | Date;
    endTime: string | Date;
  };
  academicCalendar: {
    id: string;
    name: string;
    startTime: string | Date;
    endTime: string | Date;
  };
}

export class CreateSubjectsScheduleRequest {
  subjectId: string;
  clientId: string;
  day: TDay;
  startTime: string | Date;
  endTime: string | Date;
  takenByTeacher: string;
  classId: string;
  teachingScheduleId: string;
  academicCalendarId: string;
}

export class UpdateSubjectsScheduleRequest {
  id: string;
  clientId: string;
  subjectId?: string;
  day?: TDay;
  startTime?: string | Date;
  endTime?: string | Date;
  takenByTeacher?: string;
  classId?: string;
  teachingScheduleId?: string;
  academicCalendarId?: string;
}

// academic calendar model
export class AcademicCalendarResponse {
  id: string;
  name: string;
  startTime: string | Date;
  endTime: string | Date;
}

export class CreateAcademicCalendarRequest {
  name: string;
  startTime: string | Date;
  endTime: string | Date;
}

export class UpdateAcademicCalendarRequest {
  id: string;
  name?: string;
  startTime?: string;
  endTime?: string;
}
