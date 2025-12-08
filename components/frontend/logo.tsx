import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-xl md:text-2xl font-extrabold tracking-tight text-balance flex items-center gap-2",
        className
      )}
    >
      Desishub <span className="hidden md:block">Online</span>
    </h1>
  );
}
