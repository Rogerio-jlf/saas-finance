import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'O Email é obrigatório')
    .trim()
    .pipe(
      z
        .string()
        .regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
          'Email inválido',
        ),
    ),

  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .superRefine((val, ctx) => {
      if (val.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Senha inválida',
        });
        return;
      }

      const checks = [
        { regex: /[A-Z]/, message: 'Senha inválida' },
        { regex: /[a-z]/, message: 'Senha inválida' },
        { regex: /[0-9]/, message: 'Senha inválida' },
        { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'Senha inválida' },
      ];

      for (const check of checks) {
        if (!check.regex.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: check.message,
          });
          return;
        }
      }
    }),
});

export type TypeLoginFormSchema = z.infer<typeof loginFormSchema>;
