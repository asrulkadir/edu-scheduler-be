import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(6).max(100),
  });
}
