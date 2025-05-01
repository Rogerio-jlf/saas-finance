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
import { TypeLoginFormSchema } from '../../schemas/loginFormSchema';

interface PasswordInputProps {
  register: UseFormRegister<TypeLoginFormSchema>;
  watch: UseFormWatch<TypeLoginFormSchema>;
  passwordError?: string;
}

export function PasswordInput({
  register,
  watch,
  passwordError,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const passwordValue = watch('password') || '';

  const [passwordRequirements, setPasswordRequirements] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);

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
    </>
  );
}
