'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaArrowRight, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { SiWebmoney } from 'react-icons/si';
import '../styles/general.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    setIsValidEmail(pattern.test(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) {
      // Aqui seria a lógica para enviar o email de redefinição
      setSubmitted(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1e142c] to-[#2d1a3f] font-sans text-[#f9f8fa]">
      {/* Card principal */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-[rgba(15,10,20,0.8)] shadow-2xl backdrop-blur-xl">
        {/* Cabeçalho com gradiente */}
        <div className="bg-gradient-to-r from-[#8a35d7] to-[#c861ff] p-8 text-center">
          <SiWebmoney className="mx-auto h-16 w-16" />
          <h2 className="mt-4 text-3xl font-bold">Finan Flow</h2>
          <p className="mt-2 text-sm font-light text-[#f2e9fa]">
            Recuperação de senha
          </p>
        </div>

        {/* Formulário ou Mensagem de Sucesso */}
        <div className="p-8">
          {!submitted ? (
            <>
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-xl font-medium">
                  Esqueceu sua senha?
                </h3>
                <p className="text-sm text-[#a392b3]">
                  Insira seu email e enviaremos instruções para redefinir sua
                  senha.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Email */}
                <div className="relative">
                  <input
                    required
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    className={`peer h-14 w-full rounded-lg border-2 border-transparent bg-[#251930] px-4 pt-6 pb-2 text-[#f9f8fa] transition-all outline-none ${
                      isValidEmail === null
                        ? 'focus:border-[#a240ff]'
                        : isValidEmail
                          ? 'border-green-500'
                          : 'border-red-500'
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

                {/* Botão Enviar */}
                <button
                  type="submit"
                  disabled={!isValidEmail}
                  className="group relative h-14 w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#a240ff] to-[#b562ff] font-medium text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-[-8px]">
                    Enviar instruções
                    <FaArrowRight className="ml-2 opacity-0 transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-100" />
                  </span>
                </button>
              </form>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <FaCheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Email enviado!</h3>
              <p className="mb-8 text-sm text-[#a392b3]">
                Enviamos instruções de recuperação de senha para{' '}
                <span className="text-[#f9f8fa]">{email}</span>. Por favor,
                verifique sua caixa de entrada e spam.
              </p>
              <p className="text-sm text-[#a392b3]">
                Não recebeu o email?{' '}
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-medium text-[#a240ff] transition-colors hover:text-[#b562ff]"
                >
                  Tentar novamente
                </button>
              </p>
            </div>
          )}

          {/* Linha separadora */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-[#3d2e4a]"></div>
            <span className="mx-4 text-xs text-[#a392b3]">ou</span>
            <div className="flex-grow border-t border-[#3d2e4a]"></div>
          </div>

          {/* Link para voltar ao login */}
          <div className="text-center">
            <p className="text-sm text-[#a392b3]">
              Lembrou sua senha?{' '}
              <Link
                href="/login"
                className="font-medium text-[#a240ff] transition-colors hover:text-[#b562ff]"
              >
                Voltar ao login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
