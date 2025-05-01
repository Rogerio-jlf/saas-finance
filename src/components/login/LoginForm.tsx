'use client';

import {
  loginFormSchema,
  TypeLoginFormSchema,
} from '@/schemas/loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/general.css';
import { CardHeader } from './CardHeader';
import { DividingLine } from './DividingLine';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { SubmitButton } from './SubmitButton';

const LoginForm = () => {
  const [output, setOutput] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TypeLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const emailValue = watch('email');
  const isValidEmailValue = emailValue
    ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(emailValue)
    : null;

  const handleSubmitLogin = (data: TypeLoginFormSchema) => {
    console.log('Form data:', data);
    setOutput(JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1e142c] to-[#2d1a3f] font-sans text-[#f9f8fa]">
      {/* Card */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-[rgba(15,10,20,0.8)] shadow-2xl backdrop-blur-xl">
        {/* Cabeçalho do card */}
        <CardHeader
          title="Finan Flow"
          subtitle="Faça login e domine suas finanças com inteligência"
        />

        {/* Formulário */}
        <div className="p-8">
          <form
            onSubmit={handleSubmit((data) => {
              console.log('Submitting form...');
              handleSubmitLogin(data);
            })}
            className="space-y-5"
          >
            {/* Email */}
            <EmailInput
              register={register}
              value={emailValue}
              isValid={isValidEmailValue}
              error={errors.email?.message}
            />

            {/* Senha */}
            <PasswordInput
              register={register}
              watch={watch}
              passwordError={errors.password?.message}
            />

            {/* Link Esqueceu a senha */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-[#a240ff] transition-colors hover:text-[#b562ff]"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão de Login */}

            <SubmitButton loading={isSubmitting}>Login</SubmitButton>
          </form>

          {/* Exibir saída do formulário */}
          {output && (
            <pre className="mt-4 max-w-md overflow-x-auto rounded bg-[#1f1b2c] p-4 text-sm text-white">
              {output}
            </pre>
          )}

          {/* Linha separadora */}
          <DividingLine />

          {/* Link de criar conta */}
          <div className="text-center">
            <p className="text-sm text-[#a392b3]">
              Não possui uma conta?{' '}
              <Link
                href="/sign-up"
                className="font-medium text-[#a240ff] transition-colors hover:text-[#b562ff]"
              >
                Crie a sua aqui!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
