// components/SubmitButton.tsx
import { FaArrowRight } from 'react-icons/fa';

interface SubmitButtonProps {
  loading: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ loading, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="group relative mt-4 h-14 w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-[#033e25] to-[#2da21e] font-medium text-white shadow-lg transition-all hover:shadow-xl"
      disabled={loading}
    >
      <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-[-8px]">
        {loading ? 'Carregando...' : children}
        <FaArrowRight className="ml-2 opacity-0 transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-100" />
      </span>
    </button>
  );
}
