import { EUserRole } from 'src/utils/enum';
import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z
    .object({
      clientName: z.string().min(1).max(100),
      username: z.string().min(1).max(100),
      password: z.string().min(6).max(100),
      name: z.string().min(1).max(100),
      email: z.string().email(),
    })
    // validate password at least min 6 characters include number, uppercase, lowercase, and special character
    .refine(
      (data) => {
        const password = data.password;
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
        return regex.test(password);
      },
      {
        message:
          'Password must contain at least 6 characters, include number, uppercase, lowercase, and special character',
        path: ['password'],
      },
    );
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    role: z.enum([EUserRole.Admin, EUserRole.Teacher, EUserRole.Student]),
    username: z.string().min(1).max(100),
    clientId: z.string().uuid(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(100).optional(),
    role: z
      .enum([EUserRole.Admin, EUserRole.Teacher, EUserRole.Student])
      .optional(),
    username: z.string().min(1).max(100).optional(),
  });

  static readonly GET: ZodType = z.object({
    id: z.string().uuid(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.string().uuid(),
  });
}
