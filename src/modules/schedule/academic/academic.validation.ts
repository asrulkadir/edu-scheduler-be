import { z, ZodType } from 'zod';

export class AcademicValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(250),
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
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(250).optional(),
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
  });

  static readonly DELETE: ZodType = z.object({
    id: z.string().uuid(),
  });
}
