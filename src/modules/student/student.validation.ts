import { Gender } from '@prisma/client';
import { z, ZodType } from 'zod';

export class StudentValidation {
  static readonly CREATE: ZodType = z.object({
    clientId: z.string().uuid(),
    classId: z.string().uuid(),
    name: z.string().min(1).max(100),
    gender: z.enum([Gender.female, Gender.male]),
    nis: z.string(),
    profileImg: z.string().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string().uuid(),
    clientId: z.string().uuid(),
    classId: z.string().uuid().optional(),
    name: z.string().min(1).max(100).optional(),
    gender: z.enum([Gender.female, Gender.male]).optional(),
    nis: z.string().min(1).max(100).optional(),
    profileImg: z.string().optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.string().uuid(),
  });
}
