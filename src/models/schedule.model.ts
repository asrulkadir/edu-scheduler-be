// teaching schedule model
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
  day: string;
  start: string;
  end: string;
}

export class CreateTeachingScheduleRequest {
  subjectId: string;
  teacherId: string;
  day: string;
  start: string;
  end: string;
}

export class UpdateTeachingScheduleRequest {
  id: string;
  subjectId?: string;
  teacherId?: string;
  day?: string;
  start?: string;
  end?: string;
}

// subjects schedule model
export class SubjectsScheduleResponse {
  id: string;
  subject: {
    id: string;
    name: string;
  };
  day: string;
  start: string;
  end: string;
  teacher: {
    id: string;
    name: string;
  };
  class: {
    id: string;
    name: string;
  };
  teachingSchedule: {
    id: string;
    day: string;
    start: string;
    end: string;
  };
  academicCalendar: {
    id: string;
    name: string;
    start: string;
    end: string;
  };
}

export class CreateSubjectsScheduleRequest {
  subjectId: string;
  day: string;
  start: string;
  end: string;
  teacherId: string;
  classId: string;
  teachingScheduleId: string;
  academicCalendarId: string;
}

export class UpdateSubjectsScheduleRequest {
  id: string;
  subjectId?: string;
  day?: string;
  start?: string;
  end?: string;
  teacherId?: string;
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
  startTime: string;
  endTime: string;
}

export class UpdateAcademicCalendarRequest {
  id: string;
  name?: string;
  start?: string;
  end?: string;
}
