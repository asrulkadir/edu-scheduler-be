import { z, ZodType } from 'zod';

export class ClassValidation {
  static readonly CREATE: ZodType = z.object({
    clientId: z.string().uuid(),
    name: z.string().min(1).max(100),
    homeroomTeacherId: z.string().uuid().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string().uuid(),
    clientId: z.string().uuid(),
    name: z.string().min(1).max(100).optional(),
    homeroomTeacherId: z.string().uuid().optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.string().uuid(),
  });
}
