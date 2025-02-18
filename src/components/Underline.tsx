export function Underline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative group">
      {children}
      <div className="absolute bottom-[0px] h-[1px] w-0 group-hover:w-full bg-black transition-all duration-200 ease-in-out" />
    </span>
  );
}
