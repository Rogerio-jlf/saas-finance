import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaTimesCircle,
} from 'react-icons/fa';
import { SignUpSchema } from '../../schemas/signUpSchema';

interface PasswordInputsProps {
  register: UseFormRegister<SignUpSchema>;
  watch: UseFormWatch<SignUpSchema>;
  passwordError?: string;
  confirmPasswordError?: string;
}

export function PasswordInputs({
  register,
  watch,
  passwordError,
  confirmPasswordError,
}: PasswordInputsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const passwordValue = watch('password') || '';
  const confirmPasswordValue = watch('confirmPassword') || '';
  const passwordsMatch = confirmPasswordValue
    ? passwordValue === confirmPasswordValue
    : null;

  const [passwordRequirements, setPasswordRequirements] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

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

  // Atualiza os requisitos e força da senha sempre que a senha muda
  useEffect(() => {
    const updatedRequirements = {
      hasMinLength: passwordValue.length >= 8,
      hasUpperCase: /[A-Z]/.test(passwordValue),
      hasLowerCase: /[a-z]/.test(passwordValue),
      hasNumber: /[0-9]/.test(passwordValue),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
    };

    setPasswordRequirements(updatedRequirements);

    const completedRequirements =
      Object.values(updatedRequirements).filter(Boolean).length;
    let strengthScore = 0;
    let strengthLabel = '';

    if (passwordValue.length === 0) {
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
  }, [passwordValue]);

  return (
    <>
      {/* Campo de Senha */}
      <div className="space-y-2">
        <div className="relative">
          <input
            required
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => {
              if (!passwordValue) {
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
              passwordValue
                ? 'top-2 text-xs'
                : 'top-1/2 -translate-y-1/2 text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs'
            }`}
          >
            Senha
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-[#a392b3] transition-colors hover:text-[#f9f8fa]"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showPassword ? 'Ocultar senha' : 'Mostrar senha'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Barra de força da senha */}
        {passwordValue && (
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
                {passwordStrength.label && `Senha: ${passwordStrength.label}`}
              </span>
            </div>
          </div>
        )}

        {/* Requisitos da senha */}
        {(passwordFocused || passwordValue) && (
          <div className="mt-2 rounded-lg bg-[#251930] p-3">
            <p className="mb-2 text-xs text-[#a392b3]">A senha deve conter:</p>
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
        {passwordError && (
          <span className="text-xs text-red-500">{passwordError}</span>
        )}
      </div>

      {/* Campo de Confirmar Senha */}
      <div className="relative">
        <input
          required
          type={showConfirmPassword ? 'text' : 'password'}
          {...register('confirmPassword')}
          className={`peer h-14 w-full rounded-lg border-2 border-transparent bg-[#251930] px-4 pt-6 pr-12 pb-2 text-[#f9f8fa] transition-all outline-none ${
            passwordsMatch === null || !confirmPasswordValue
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
            confirmPasswordValue
              ? 'top-2 text-xs'
              : 'top-1/2 -translate-y-1/2 text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs'
          }`}
        >
          Confirmar senha
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                tabIndex={-1}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#a392b3] transition-colors hover:text-[#f9f8fa]"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{showPassword ? 'Ocultar senha' : 'Mostrar senha'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {passwordsMatch !== null && confirmPasswordValue && (
          <span className="absolute top-1/2 right-12 -translate-y-1/2">
            {passwordsMatch ? (
              <FaCheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <FaTimesCircle className="h-5 w-5 text-red-500" />
            )}
          </span>
        )}
        {confirmPasswordError && (
          <span className="absolute top-1/2 right-4 -translate-y-1/2 text-red-500">
            {confirmPasswordError}
          </span>
        )}
      </div>
    </>
  );
}
