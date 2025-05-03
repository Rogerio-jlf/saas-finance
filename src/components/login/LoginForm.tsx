'use client';

import {
  loginFormSchema,
  TypeLoginFormSchema,
} from '@/schemas/loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
// import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import '../../styles/general.css';
import { CardHeader } from './CardHeader';
import { DividingLine } from './DividingLine';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { SubmitButton } from './SubmitButton';


const LoginForm = () => {
  // const [output, setOutput] = useState('');
  const routerNavigation = useRouter();

  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TypeLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  // Retorna o valor do campo de email
  const emailValue = watch('email');
  // Verifica se o valor do campo de email é válido
  const isValidEmailValue = emailValue
    ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(emailValue)
    : null;

  // Retorna o valor do campo de senha
  const passwordValue = watch('password');
  // Verifica se o valor do campo de senha é válido
  const isValidPasswordValue = passwordValue
    ? passwordValue.length >= 8 &&
      /[A-Z]/.test(passwordValue) &&
      /[a-z]/.test(passwordValue) &&
      /[0-9]/.test(passwordValue) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)
    : null;

  // const handleSubmitLogin = (data: TypeLoginFormSchema) => {
  //   console.log('Form data:', data);
  //   setOutput(JSON.stringify(data, null, 2));
  // };

  // Chamada da função de login
  async function handleSubmitLogin(
    data: TypeLoginFormSchema,
    event: React.FormEvent,
  ) {
    event.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.ok) {
      routerNavigation.push('/dashboard');
    } else {
      toast('Email ou senha inválidos. Verifique e tente novamente.');
    }
  }

  //------------------------------------------------------------

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
            onSubmit={handleSubmit((data, event) => {
              console.log('Submitting form...');
              handleSubmitLogin(data, event as React.FormEvent);
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
              isValid={isValidPasswordValue}
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
          {/* {output && (
            <pre className="mt-4 max-w-md overflow-x-auto rounded bg-[#1f1b2c] p-4 text-sm text-white">
              {output}
            </pre>
          )} */}

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
