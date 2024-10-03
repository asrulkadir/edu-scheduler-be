import { z, ZodType } from 'zod';

export class SubjectsValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    clientId: z.string().uuid(),
    teacher: z.array(z.string().uuid()).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string().uuid(),
    clientId: z.string().uuid(),
    name: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(100).optional(),
    teacher: z.array(z.string().uuid()).optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.string().uuid(),
  });
}
