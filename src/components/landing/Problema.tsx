export function Problema() {
  return (
    <section className="bg-wine text-wine-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="text-center font-display text-3xl leading-[1] font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Tu perro no está intentando portarse mal.
        </h2>
        <p className="mt-3 font-display text-2xl font-bold text-primary sm:text-3xl">
          Está intentando comunicarse.
        </p>

        <div className="mt-8 space-y-4 text-base leading-relaxed sm:text-lg">
          <div className="rounded-3xl bg-wine-foreground/10 p-5 sm:p-6">
            <p className="text-justify hyphens-auto text-wine-foreground/85">
              Cuando ladra, rompe cosas, hace sus necesidades donde no corresponde o tira de la
              correa, la mayoría piensa que el problema está en el perro.
            </p>
            <p className="mt-3 font-display text-xl font-bold text-primary sm:text-2xl">
              La realidad es otra.
            </p>
          </div>

          <div className="rounded-3xl bg-blush/20 p-5 sm:p-6">
            <p className="text-justify hyphens-auto text-wine-foreground/90">
              La mayoría de esos comportamientos aparecen porque nadie enseñó al propietario a
              interpretar correctamente las señales de su perro.
            </p>
            <p className="text-justify hyphens-auto mt-3 text-wine-foreground/90">
              Cada día que pasa sin entenderlo, esos pequeños comportamientos se convierten en
              hábitos difíciles de corregir.
            </p>
          </div>

          <div className="rounded-3xl bg-primary p-5 text-primary-foreground sm:p-6">
            <p className="text-justify hyphens-auto font-bold">
              TRADUCTOR CANINO IA nace para evitar precisamente eso.
            </p>
            <p className="mt-3">No reemplaza a un entrenador.</p>
            <p>No reemplaza tu vínculo con tu perro.</p>
            <p className="mt-1 font-display text-xl font-extrabold sm:text-2xl">Lo fortalece.</p>
          </div>

          <div className="rounded-3xl border border-wine-foreground/20 p-5 sm:p-6">
            <p className="text-justify hyphens-auto text-wine-foreground/85">
              Analiza su comportamiento, interpreta las posibles causas y te dice exactamente qué
              hacer para ayudarlo.
            </p>
            <p className="text-justify hyphens-auto mt-3 text-wine-foreground/85">
              Porque cuando entiendes el motivo del comportamiento...
            </p>
            <p className="mt-2 font-display text-xl font-extrabold text-primary sm:text-2xl">
              Las decisiones correctas aparecen solas.
            </p>
          </div>
        </div>


        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
            <p className="font-display text-4xl font-extrabold">60 %</p>
            <p className="mt-2 text-sm font-medium">
              de las conductas problemáticas nacen de señales mal interpretadas por el propietario.
            </p>
          </div>
          <div className="rounded-3xl bg-wine-foreground/10 p-6">
            <p className="font-display text-4xl font-extrabold text-primary">65 %</p>
            <p className="mt-2 text-sm font-medium text-wine-foreground/85">
              se corrigen antes si actúas en las primeras semanas, con la guía correcta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
