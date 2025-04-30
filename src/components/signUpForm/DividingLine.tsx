interface FormDividerProps {
  text?: string;
}

export function DividingLine({ text = 'ou' }: FormDividerProps) {
  return (
    <div className="my-6 flex items-center">
      <div className="flex-grow border-t border-[#3d2e4a]"></div>
      <span className="mx-4 text-xs text-[#a392b3]">{text}</span>
      <div className="flex-grow border-t border-[#3d2e4a]"></div>
    </div>
  );
}
