import { z, ZodType } from 'zod';

export class ClassValidation {
  static readonly CREATE: ZodType = z.object({
    clientId: z.string().uuid(),
    name: z.string().min(1).max(50),
    description: z.string().max(255).optional(),
    homeroomTeacherId: z.string().uuid().optional(),
    subjects: z.array(z.string().uuid()).optional(),
    students: z.array(z.string().uuid()).optional(),
    subjectsSchedule: z.array(z.string().uuid()).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string().uuid(),
    clientId: z.string().uuid(),
    name: z.string().min(1).max(50).optional(),
    description: z.string().max(255).optional(),
    homeroomTeacherId: z.string().uuid().optional(),
    subjects: z.array(z.string().uuid()).optional(),
    students: z.array(z.string().uuid()).optional(),
    subjectsSchedule: z.array(z.string().uuid()).optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.string().uuid(),
  });
}
