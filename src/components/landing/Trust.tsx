import { CreditCard, ShieldCheck, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "light" | "dark";
  withTime?: boolean;
};

export function TrustChips({ className, variant = "light", withTime = false }: Props) {
  const items = [
    { icon: CreditCard, label: "Sin tarjeta de crédito" },
    { icon: ShieldCheck, label: "Sin compromiso" },
    ...(withTime ? [{ icon: Timer, label: "Informe en 3 minutos" }] : []),
  ];

  return (
    <ul className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold sm:text-sm",
            variant === "dark"
              ? "bg-wine-foreground/10 text-wine-foreground/90"
              : "bg-secondary text-secondary-foreground",
          )}
        >
          <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="min-w-0">{label}</span>
        </li>
      ))}
    </ul>
  );
}
