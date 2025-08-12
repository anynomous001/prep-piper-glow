import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2 select-none", className)} aria-label="Prep Piper Logo">
      <div className="h-6 w-6 rounded-md" style={{
        background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary)), transparent 60%), radial-gradient(circle at 70% 70%, hsl(var(--accent)), transparent 60%)'
      }} />
      <span className="font-semibold tracking-tight">Prep Piper</span>
    </div>
  );
};
