import { Gender } from '@prisma/client';
import { z, ZodType } from 'zod';

export class TeacherValidation {
  static readonly CREATE: ZodType = z.object({
    clientId: z.string().uuid(),
    name: z.string().min(1).max(100),
    gender: z.enum([Gender.female, Gender.male]),
    nip: z.string(),
    subjects: z.array(z.string().uuid()).optional(),
    profileImg: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100).optional(),
    gender: z.enum([Gender.female, Gender.male]).optional(),
    nip: z.string().min(1).max(100).optional(),
    profileImg: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    subjects: z.array(z.string().uuid()).optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.string().uuid(),
  });
}
