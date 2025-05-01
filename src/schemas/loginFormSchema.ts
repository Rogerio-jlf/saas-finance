import { z } from 'zod';

export const loginFormSchema = z.object({
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
    .min(8, 'A Senha é obrigatória e deve conter, no mínimo 8 caracteres...')
    .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula,')
    .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula,')
    .regex(/[0-9]/, 'Deve conter ao menos um número,')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Deve conter ao menos um caractere especial.',
    ),
});

export type TypeLoginFormSchema = z.infer<typeof loginFormSchema>;
