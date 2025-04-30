import { UseFormRegister } from 'react-hook-form';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { SignUpSchema } from '../../schemas/signUpSchema';

interface EmailInputProps {
  register: UseFormRegister<SignUpSchema>;
  value: string;
  isValid: boolean | null;
  error?: string;
}

export function EmailInput({
  register,
  value,
  isValid,
  error,
}: EmailInputProps) {
  return (
    <div className="relative">
      <input
        required
        type="text"
        {...register('email')}
        className={`peer h-14 w-full rounded-lg border-2 border-transparent bg-[#251930] px-4 pt-6 pb-2 text-[#f9f8fa] transition-all outline-none ${
          isValid === null
            ? 'focus:border-[#a240ff]'
            : isValid
              ? 'border-green-500 focus:border-green-500'
              : 'border-red-500 focus:border-red-500'
        }`}
        placeholder=" "
        id="email-input"
      />
      <label
        htmlFor="email-input"
        className={`absolute left-4 text-[#a392b3] transition-all ${
          value
            ? 'top-2 text-xs'
            : 'top-1/2 -translate-y-1/2 text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs'
        }`}
      >
        Email
      </label>
      {isValid !== null && (
        <span className="absolute top-1/2 right-4 -translate-y-1/2">
          {isValid ? (
            <FaCheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <FaTimesCircle className="h-5 w-5 text-red-500" />
          )}
        </span>
      )}
      {error && (
        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
