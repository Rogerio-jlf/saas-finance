'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaArrowRight, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { SiWebmoney } from 'react-icons/si';
import '../styles/general.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    setIsValidEmail(pattern.test(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1e142c] to-[#2d1a3f] font-sans text-[#f9f8fa]">
      {/* Card principal */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-[rgba(15,10,20,0.8)] shadow-2xl backdrop-blur-xl">
        {/* Cabeçalho com gradiente */}
        <div className="bg-gradient-to-r from-[#704a94] to-[#5b038a] p-8 text-center">
          <SiWebmoney className="mx-auto h-16 w-16" />
          <h2 className="mt-4 text-3xl font-bold">Finan Flow</h2>
          <p className="mt-2 text-sm font-light text-[#f2e9fa]">
            Faça login e domine suas finanças com inteligência
          </p>
        </div>

        {/* Formulário */}
        <div className="p-8">
          <form className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                required
                type="text"
                value={email}
                onChange={handleEmailChange}
                className={`peer h-14 w-full rounded-lg border-2 border-transparent bg-[#251930] px-4 pt-6 pb-2 text-[#f9f8fa] transition-all outline-none ${
                  isValidEmail === null
                    ? 'focus:ring-2 focus:ring-[#a240ff]'
                    : isValidEmail
                      ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                      : 'border-red-500 focus:ring-2 focus:ring-red-500'
                }`}
                placeholder=" "
                id="email-input"
              />
              <label
                htmlFor="email-input"
                className={`absolute left-4 text-[#a392b3] transition-all ${
                  email
                    ? 'top-2 text-xs'
                    : 'top-1/2 -translate-y-1/2 text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs'
                }`}
              >
                Email
              </label>
              {isValidEmail !== null && (
                <span className="absolute top-1/2 right-4 -translate-y-1/2">
                  {isValidEmail ? (
                    <FaCheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <FaTimesCircle className="h-5 w-5 text-red-500" />
                  )}
                </span>
              )}
            </div>

            {/* Senha */}
            <div className="relative">
              <input
                required
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="peer h-14 w-full rounded-lg border-2 border-transparent bg-[#251930] px-4 pt-6 pb-2 text-[#f9f8fa] transition-all outline-none focus:border-[#a240ff]"
                placeholder=" "
                id="password-input"
              />
              <label
                htmlFor="password-input"
                className={`absolute left-4 text-[#a392b3] transition-all ${
                  password
                    ? 'top-2 text-xs'
                    : 'top-1/2 -translate-y-1/2 text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs'
                }`}
              >
                Senha
              </label>
            </div>

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
            <button
              type="submit"
              className="group relative h-14 w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#34044e] to-[#5e3485] font-medium text-white shadow-lg transition-all hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-[-8px]">
                Login
                <FaArrowRight className="ml-2 opacity-0 transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-100" />
              </span>
            </button>
          </form>

          {/* Linha separadora */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-[#3d2e4a]"></div>
            <span className="mx-4 text-xs text-[#a392b3]">ou</span>
            <div className="flex-grow border-t border-[#3d2e4a]"></div>
          </div>

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
