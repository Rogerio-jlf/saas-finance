'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaTimesCircle,
} from 'react-icons/fa';
import { SiWebmoney } from 'react-icons/si';
import '../styles/general.css';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Estado para controlar os requisitos da senha
  const [passwordRequirements, setPasswordRequirements] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Estado para controlar a força da senha
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0, // 0-4
    label: '',
  });

  useEffect(() => {
    // Verifica cada requisito
    const updatedRequirements = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setPasswordRequirements(updatedRequirements);

    // Calcula a força da senha
    const completedRequirements =
      Object.values(updatedRequirements).filter(Boolean).length;

    let strengthScore = 0;
    let strengthLabel = '';

    if (password.length === 0) {
      strengthScore = 0;
      strengthLabel = '';
    } else if (completedRequirements === 1) {
      strengthScore = 1;
      strengthLabel = 'Fraca';
    } else if (completedRequirements === 2 || completedRequirements === 3) {
      strengthScore = 2;
      strengthLabel = 'Média';
    } else if (completedRequirements === 4) {
      strengthScore = 3;
      strengthLabel = 'Forte';
    } else if (completedRequirements === 5) {
      strengthScore = 4;
      strengthLabel = 'Muito forte';
    }

    setPasswordStrength({
      score: strengthScore,
      label: strengthLabel,
    });

    // Verifica se as senhas coincidem
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    setIsValidEmail(pattern.test(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Função para retornar a cor da barra de força da senha
  const getStrengthColor = () => {
    switch (passwordStrength.score) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-green-500';
      case 4:
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
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
            Crie sua conta e organize suas finanças
          </p>
        </div>

        {/* Formulário */}
        <div className="p-8">
          <form className="space-y-5">
            {/* Nome */}
            <div className="relative">
              <input
                required
                type="text"
                value={name}
                onChange={handleNameChange}
                className="peer h-14 w-full rounded-lg border-2 border-transparent bg-[#251930] px-4 pt-6 pb-2 text-[#f9f8fa] transition-all outline-none focus:border-[#a240ff]"
                placeholder=" "
                id="name-input"
              />
              <label
                htmlFor="name-input"
                className={`absolute left-4 text-[#a392b3] transition-all ${
                  name
                    ? 'top-2 text-xs'
                    : 'top-1/2 -translate-y-1/2 text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs'
                }`}
              >
                Nome completo
              </label>
            </div>

            {/* Email */}
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

            {/* Senha com requisitos e barra de força */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => {
                    // Mantém os requisitos visíveis se houver algum texto digitado
                    if (!password) {
                      setPasswordFocused(false);
                    }
                  }}
                  className="peer h-14 w-full rounded-lg border-2 border-transparent bg-[#251930] px-4 pt-6 pr-12 pb-2 text-[#f9f8fa] transition-all outline-none focus:border-[#a240ff]"
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
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-[#a392b3] transition-colors hover:text-[#f9f8fa]"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Barra de força da senha */}
              {password && (
                <div className="space-y-1">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-[#251930]">
                    <div
                      className={`h-full transition-all ${getStrengthColor()}`}
                      style={{
                        width: `${(passwordStrength.score / 4) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#a392b3]">
                      {passwordStrength.label &&
                        `Senha: ${passwordStrength.label}`}
                    </span>
                  </div>
                </div>
              )}

              {/* Requisitos da senha */}
              {(passwordFocused || password) && (
                <div className="mt-2 rounded-lg bg-[#251930] p-3">
                  <p className="mb-2 text-xs text-[#a392b3]">
                    A senha deve conter:
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-center">
                      {passwordRequirements.hasMinLength ? (
                        <FaCheckCircle className="mr-2 h-3 w-3 text-green-500" />
                      ) : (
                        <FaTimesCircle className="mr-2 h-3 w-3 text-[#a392b3]" />
                      )}
                      <span
                        className={
                          passwordRequirements.hasMinLength
                            ? 'text-green-500'
                            : 'text-[#a392b3]'
                        }
                      >
                        No mínimo 8 caracteres
                      </span>
                    </li>
                    <li className="flex items-center">
                      {passwordRequirements.hasUpperCase ? (
                        <FaCheckCircle className="mr-2 h-3 w-3 text-green-500" />
                      ) : (
                        <FaTimesCircle className="mr-2 h-3 w-3 text-[#a392b3]" />
                      )}
                      <span
                        className={
                          passwordRequirements.hasUpperCase
                            ? 'text-green-500'
                            : 'text-[#a392b3]'
                        }
                      >
                        Pelo menos uma letra maiúscula
                      </span>
                    </li>
                    <li className="flex items-center">
                      {passwordRequirements.hasLowerCase ? (
                        <FaCheckCircle className="mr-2 h-3 w-3 text-green-500" />
                      ) : (
                        <FaTimesCircle className="mr-2 h-3 w-3 text-[#a392b3]" />
                      )}
                      <span
                        className={
                          passwordRequirements.hasLowerCase
                            ? 'text-green-500'
                            : 'text-[#a392b3]'
                        }
                      >
                        Pelo menos uma letra minúscula
                      </span>
                    </li>
                    <li className="flex items-center">
                      {passwordRequirements.hasNumber ? (
                        <FaCheckCircle className="mr-2 h-3 w-3 text-green-500" />
                      ) : (
                        <FaTimesCircle className="mr-2 h-3 w-3 text-[#a392b3]" />
                      )}
                      <span
                        className={
                          passwordRequirements.hasNumber
                            ? 'text-green-500'
                            : 'text-[#a392b3]'
                        }
                      >
                        Pelo menos um número
                      </span>
                    </li>
                    <li className="flex items-center">
                      {passwordRequirements.hasSpecial ? (
                        <FaCheckCircle className="mr-2 h-3 w-3 text-green-500" />
                      ) : (
                        <FaTimesCircle className="mr-2 h-3 w-3 text-[#a392b3]" />
                      )}
                      <span
                        className={
                          passwordRequirements.hasSpecial
                            ? 'text-green-500'
                            : 'text-[#a392b3]'
                        }
                      >
                        Pelo menos um caractere especial
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="relative">
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`peer h-14 w-full rounded-lg border-2 border-transparent bg-[#251930] px-4 pt-6 pr-12 pb-2 text-[#f9f8fa] transition-all outline-none ${
                  passwordsMatch === null || !confirmPassword
                    ? 'focus:border-[#a240ff]'
                    : passwordsMatch
                      ? 'border-green-500'
                      : 'border-red-500'
                }`}
                placeholder=" "
                id="confirm-password-input"
              />
              <label
                htmlFor="confirm-password-input"
                className={`absolute left-4 text-[#a392b3] transition-all ${
                  confirmPassword
                    ? 'top-2 text-xs'
                    : 'top-1/2 -translate-y-1/2 text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs'
                }`}
              >
                Confirmar senha
              </label>
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#a392b3] transition-colors hover:text-[#f9f8fa]"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
              {passwordsMatch !== null && confirmPassword && (
                <span className="absolute top-1/2 right-12 -translate-y-1/2">
                  {passwordsMatch ? (
                    <FaCheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <FaTimesCircle className="h-5 w-5 text-red-500" />
                  )}
                </span>
              )}
            </div>

            {/* Política de privacidade */}
            <div className="mt-4 flex items-start">
              <input
                type="checkbox"
                id="privacy-policy"
                className="mt-1 h-4 w-4 rounded border-[#a392b3] bg-[#251930] text-[#a240ff] focus:ring-[#a240ff]"
              />
              <label
                htmlFor="privacy-policy"
                className="ml-2 text-xs text-[#a392b3]"
              >
                Concordo com os{' '}
                <Link href="#" className="text-[#a240ff] hover:text-[#b562ff]">
                  Termos de Uso
                </Link>{' '}
                e{' '}
                <Link href="#" className="text-[#a240ff] hover:text-[#b562ff]">
                  Política de Privacidade
                </Link>
              </label>
            </div>

            {/* Botão de Cadastro */}
            <button
              type="submit"
              className="group relative mt-4 h-14 w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#a240ff] to-[#b562ff] font-medium text-white shadow-lg transition-all hover:shadow-xl"
              disabled={
                !isValidEmail || !passwordsMatch || passwordStrength.score < 2
              }
            >
              <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-[-8px]">
                Criar conta
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
