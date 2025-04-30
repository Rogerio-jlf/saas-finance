import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z
      .string()
      .min(10, 'O Nome Completo é obrigatório.')
      .transform((name) => {
        const lowercaseWords = ['da', 'de', 'do', 'das', 'dos'];
        return name
          .trim()
          .split(' ')
          .map((word, index) => {
            const lower = word.toLowerCase();
            if (index !== 0 && lowercaseWords.includes(lower)) {
              return lower;
            }
            return lower.charAt(0).toUpperCase() + lower.slice(1);
          })
          .join(' ');
      }),

    email: z
      .string()
      .min(1, 'O Email é obrigatório.')
      .trim()
      .pipe(
        z
          .string()
          .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email inválido.',
          ),
      ),

    password: z
      .string()
      .min(8, 'A senha deve conter, no mínimo 8 caracteres...')
      .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula,')
      .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula,')
      .regex(/[0-9]/, 'Deve conter ao menos um número,')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Deve conter ao menos um caractere especial.',
      ),

    confirmPassword: z.string().min(8, 'A Confirmação de Senha é obrigatória.'),

    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: 'Você deve aceitar os termos.',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As Senhas NÃO coincidem.',
        path: ['confirmPassword'],
        fatal: true,
      });
    }
  });

export type UserSchema = z.infer<typeof createUserSchema>;
