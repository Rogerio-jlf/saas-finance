/**
 * Componente personalizado para entrada de nome com capitalização automática
 * @param register - Função de registro do react-hook-form
 * @param setValue - Função para definir valores do formulário
 * @param value - Valor atual do campo
 * @param error - Mensagem de erro (opcional)
 */

import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { SignUpSchema } from '../../schemas/signUpSchema';
interface NameInputProps {
  register: UseFormRegister<SignUpSchema>;
  setValue: UseFormSetValue<SignUpSchema>;
  value: string;
  error?: string;
}

export function NameInput({
  register,
  setValue,
  value,
  error,
}: NameInputProps) {
  function capitalizeWords(e: React.ChangeEvent<HTMLInputElement>) {
    const words = e.target.value.split(' ');
    const lowerCaseWords = ['e', 'da', 'das', 'de', 'di', 'do', 'dos'];

    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      if (lowerCaseWords.includes(word) && i !== 0) {
        words[i] = word;
      } else {
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }
    }

    const capitalized = words.join(' ');
    setValue('name', capitalized, { shouldValidate: true });
  }

  return (
    <div className="relative">
      <input
        required
        type="text"
        {...register('name')}
        onChange={capitalizeWords}
        className="peer h-14 w-full rounded-lg border-2 border-transparent bg-[#251930] px-4 pt-6 pb-2 text-[#f9f8fa] transition-all outline-none focus:border-[#a240ff]"
        placeholder=" "
        id="name-input"
      />
      <label
        htmlFor="name-input"
        className={`absolute left-4 text-[#a392b3] transition-all ${
          value
            ? 'top-2 text-xs'
            : 'top-1/2 -translate-y-1/2 text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs'
        }`}
      >
        Nome completo
      </label>
      {error && (
        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
