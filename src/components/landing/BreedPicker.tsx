import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Dog, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Grupo = { grupo: string; razas: string[] };

export const RAZAS_POR_GRUPO: Grupo[] = [
  {
    grupo: "Más comunes",
    razas: [
      "Mestizo / sin raza definida",
      "Labrador Retriever",
      "Golden Retriever",
      "Pastor Alemán",
      "Bulldog Francés",
      "Poodle / Caniche",
      "Chihuahua",
      "Yorkshire Terrier",
      "Beagle",
      "Shih Tzu",
      "Dachshund / Salchicha",
      "Pomerania",
      "Schnauzer",
      "Maltés",
      "Pug",
      "Border Collie",
      "Cocker Spaniel",
      "Boxer",
      "Rottweiler",
      "Husky Siberiano",
    ],
  },
  {
    grupo: "Pequeñas y compañía",
    razas: [
      "Bichón Frisé",
      "Bichón Habanero",
      "Lhasa Apso",
      "Pekinés",
      "Papillón",
      "Cavalier King Charles Spaniel",
      "Boston Terrier",
      "Carlino toy",
      "Shih Poo / mezclas caniche",
      "Spitz japonés",
      "Coton de Tuléar",
      "Pinscher Miniatura",
    ],
  },
  {
    grupo: "Terriers",
    razas: [
      "Jack Russell Terrier",
      "Fox Terrier",
      "West Highland White Terrier",
      "Scottish Terrier",
      "Bull Terrier",
      "Staffordshire Bull Terrier",
      "American Bully / Pitbull",
      "Airedale Terrier",
      "Cairn Terrier",
      "Schnauzer Miniatura",
    ],
  },
  {
    grupo: "Pastoreo y trabajo",
    razas: [
      "Pastor Australiano",
      "Pastor Belga Malinois",
      "Pastor Belga Groenendael",
      "Collie",
      "Shetland Sheepdog",
      "Corgi Galés (Pembroke)",
      "Bearded Collie",
      "Bouvier de Flandes",
      "Boyero de Berna",
      "Doberman",
      "Gran Danés",
      "Cane Corso",
      "Dogo Argentino",
      "Mastín / Mastín Napolitano",
      "San Bernardo",
      "Terranova",
      "Rhodesian Ridgeback",
      "Akita Inu",
      "Shiba Inu",
      "Samoyedo",
      "Alaskan Malamute",
      "Chow Chow",
    ],
  },
  {
    grupo: "Caza, rastro y deportivos",
    razas: [
      "Springer Spaniel",
      "Bretón",
      "Setter Irlandés",
      "Setter Inglés",
      "Pointer",
      "Weimaraner",
      "Braco Alemán",
      "Vizsla",
      "Basset Hound",
      "Bloodhound / Sabueso",
      "Foxhound",
      "Galgo Español",
      "Whippet",
      "Greyhound",
      "Podenco",
      "Dálmata",
      "Labradoodle",
      "Goldendoodle",
      "Cockapoo",
      "Perro de Agua Español",
      "Barbet",
      "Bulldog Inglés",
      "Bullmastiff",
      "Shar Pei",
      "Xoloitzcuintle",
      "Otra raza",
    ],
  },
];

const TODAS = RAZAS_POR_GRUPO.flatMap((g) => g.razas);

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

type Props = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
};

export function BreedPicker({ value, onChange, id = "raza" }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  const grupos = useMemo(() => {
    const nq = norm(q.trim());
    if (!nq) return RAZAS_POR_GRUPO;
    return RAZAS_POR_GRUPO.map((g) => ({
      grupo: g.grupo,
      razas: g.razas.filter((r) => norm(r).includes(nq)),
    })).filter((g) => g.razas.length > 0);
  }, [q]);

  const sinResultados = grupos.length === 0;
  const custom = q.trim();
  const exacto = TODAS.some((r) => norm(r) === norm(custom));

  const elegir = (raza: string) => {
    onChange(raza);
    setOpen(false);
    setQ("");
  };

  return (
    <div ref={rootRef} className="relative mt-1.5">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="grid min-h-12 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-input bg-background px-4 text-left text-base font-normal outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
      >
        <Dog className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className={cn("min-w-0 truncate", !value && "text-muted-foreground")}>
          {value || "Buscar o elegir raza…"}
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" aria-hidden="true" />
          Limpiar selección
        </button>
      ) : null}

      {open ? (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-wine/15">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 border-b border-border px-4 py-3">
            <Search className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Escribe para filtrar (ej: pastor, poodle…)"
              className="min-w-0 bg-transparent text-base font-normal outline-none placeholder:text-muted-foreground"
            />
          </div>

          <ul
            role="listbox"
            className="max-h-64 overflow-y-auto overscroll-contain py-1 sm:max-h-72"
          >
            {grupos.map((g) => (
              <li key={g.grupo}>
                <p className="sticky top-0 bg-secondary/90 px-4 py-1.5 text-[11px] font-extrabold tracking-widest text-muted-foreground uppercase backdrop-blur">
                  {g.grupo}
                </p>
                <ul>
                  {g.razas.map((r) => {
                    const activo = r === value;
                    return (
                      <li key={r}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={activo}
                          onClick={() => elegir(r)}
                          className={cn(
                            "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary",
                            activo && "bg-primary/15 font-bold",
                          )}
                        >
                          <span className="min-w-0 truncate">{r}</span>
                          {activo ? (
                            <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}

            {sinResultados ? (
              <li className="px-4 py-3 text-sm text-muted-foreground">
                No encontramos esa raza en la lista.
              </li>
            ) : null}

            {custom && !exacto ? (
              <li className="border-t border-border p-2">
                <button
                  type="button"
                  onClick={() => elegir(custom)}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-extrabold text-primary-foreground"
                >
                  Usar “{custom}”
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
