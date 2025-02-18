export function Underline({
  children,
  lineColor,
}: { children: React.ReactNode; lineColor?: string }) {
  return (
    <span className="relative group">
      {children}
      <div
        className={`absolute bottom-[0px] h-[1px] w-0 group-hover:w-full transition-all duration-200 ease-in-out ${
          lineColor ? lineColor : "bg-black"
        }`}
      />
    </span>
  );
}
