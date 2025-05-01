import { TypeSignUpFormSchema } from '@/schemas/signUpFormSchema';
import Link from 'next/link';
import { UseFormRegister } from 'react-hook-form';

interface PrivacyPolicyCheckboxProps {
  register: UseFormRegister<TypeSignUpFormSchema>;
  error?: string;
}

export function PrivacyPolicyCheckbox({
  register,
  error,
}: PrivacyPolicyCheckboxProps) {
  return (
    <div className="mt-4 flex items-start">
      <input
        type="checkbox"
        id="privacy-policy"
        {...register('acceptedTerms')}
        className="mt-1 h-4 w-4 rounded border-[#a392b3] bg-[#251930] text-[#a240ff] focus:ring-[#a240ff]"
      />
      <label
        htmlFor="privacy-policy"
        className="mt-1 ml-2 text-xs text-[#a392b3]"
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
      {error && (
        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
