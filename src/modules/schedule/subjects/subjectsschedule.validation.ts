import { z, ZodType } from 'zod';

export class SubjectsScheduleValidation {
  static readonly CREATE: ZodType = z.object({
    clientId: z.string().uuid(),
    subjectId: z.string().uuid(),
    day: z.enum([
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ]),
    startTime: z.preprocess((arg) => {
      if (typeof arg === 'string') {
        return new Date(arg);
      }
      return arg;
    }, z.date()),
    endTime: z.preprocess((arg) => {
      if (typeof arg === 'string') {
        return new Date(arg);
      }
      return arg;
    }, z.date()),
    classId: z.string().uuid(),
    academicCalendarId: z.string().uuid(),
    teacherId: z.string().uuid(),
    teachingScheduleId: z.string().uuid().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string().uuid(),
    clientId: z.string().uuid(),
    subjectId: z.string().uuid().optional(),
    day: z
      .enum([
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ])
      .optional(),
    startTime: z.preprocess((arg) => {
      if (typeof arg === 'string') {
        return new Date(arg);
      }
      return arg;
    }, z.date().optional()),
    endTime: z.preprocess((arg) => {
      if (typeof arg === 'string') {
        return new Date(arg);
      }
      return arg;
    }, z.date().optional()),
    classId: z.string().uuid().optional(),
    academicCalendarId: z.string().uuid().optional(),
    teacherId: z.string().uuid().optional(),
    teachingScheduleId: z.string().uuid().optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.string().uuid(),
  });
}
