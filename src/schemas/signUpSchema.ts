import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .transform((name) => {
        const lowercaseWords = ['de', 'do', 'da', 'dos', 'das'];

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
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email inválido',
      ),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula')
      .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
      .regex(/[0-9]/, 'Deve conter ao menos um número')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Deve conter ao menos um caractere especial',
      ),
    confirmPassword: z.string(),
    acceptedTerms: z.literal(true, {
      errorMap: () => ({ message: 'Você deve aceitar os termos' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
