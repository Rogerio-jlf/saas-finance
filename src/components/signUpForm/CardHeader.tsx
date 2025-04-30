// components/AuthCardHeader.tsx
import { SiWebmoney } from 'react-icons/si';

interface CardHeaderProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export function CardHeader({
  title,
  subtitle,
  icon = <SiWebmoney className="mx-auto h-16 w-16" />,
}: CardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#508b49] to-[#058b53] p-8 text-center">
      {icon}
      <h2 className="mt-4 text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-sm font-light text-[#f2e9fa]">{subtitle}</p>
    </div>
  );
}
