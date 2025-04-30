'use client';

import { CardHeader } from '@/components/signUpForm/CardHeader';
import { DividingLine } from '@/components/signUpForm/DividingLine';
import { SubmitButton } from '@/components/signUpForm/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUpSchema, SignUpSchema } from '../../schemas/signUpSchema';
import '../../styles/general.css';
import { EmailInput } from './EmailInput';
import { NameInput } from './NameInput';
import { PasswordInputs } from './PasswordInputs';
import { PrivacyPolicyCheckbox } from './PrivacyPolicyCheckBox';

const SignUpForm = () => {
  const [output, setOutput] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const nameValue = watch('name');
  const emailValue = watch('email');
  const isValidEmailValue = emailValue
    ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(emailValue)
    : null;

  const handleSubmitCreateUser = (data: SignUpSchema) => {
    console.log('Form data:', data);
    setOutput(JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1e142c] to-[#2d1a3f] font-sans text-[#f9f8fa]">
      {/* Card */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-[rgba(15,10,20,0.8)] shadow-2xl backdrop-blur-xl">
        {/* Cabeçalho do Card */}

        <CardHeader
          title="Crie sua conta"
          subtitle="Aproveite todos os benefícios do nosso sistema"
        />

        {/* Formulário */}
        <div className="p-8">
          <form
            onSubmit={handleSubmit((data) => {
              console.log('Submitting form...');
              handleSubmitCreateUser(data);
            })}
            className="space-y-5"
          >
            <NameInput
              register={register}
              setValue={setValue}
              value={nameValue}
              error={errors.name?.message}
            />

            <EmailInput
              register={register}
              value={emailValue}
              isValid={isValidEmailValue}
              error={errors.email?.message}
            />

            <PasswordInputs
              register={register}
              watch={watch}
              passwordError={errors.password?.message}
              confirmPasswordError={errors.confirmPassword?.message}
            />

            <PrivacyPolicyCheckbox
              register={register}
              error={errors.acceptedTerms?.message}
            />

            {/* Botão de Cadastro */}
            <SubmitButton loading={isSubmitting}>Criar Conta</SubmitButton>
          </form>

          {output && (
            <pre className="mt-4 max-w-md overflow-x-auto rounded bg-[#1f1b2c] p-4 text-sm text-white">
              {output}
            </pre>
          )}

          {/* Linha separadora */}
          <DividingLine />

          {/* Link para login */}
          <div className="text-center">
            <p className="text-sm text-[#a392b3]">
              Já possui uma conta?{' '}
              <Link
                href="/login"
                className="font-medium text-[#a240ff] transition-colors hover:text-[#b562ff]"
              >
                Entre aqui!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
