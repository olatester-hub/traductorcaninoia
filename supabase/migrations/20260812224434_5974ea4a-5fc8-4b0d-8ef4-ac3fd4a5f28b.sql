CREATE TABLE public.licencias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  version TEXT NOT NULL CHECK (version IN ('base','premium')),
  estado TEXT NOT NULL DEFAULT 'activa' CHECK (estado IN ('activa','revocada')),
  hotmart_product_id TEXT,
  hotmart_offer TEXT,
  hotmart_transaction TEXT,
  comprador_nombre TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX licencias_email_key ON public.licencias (lower(email));

GRANT SELECT ON public.licencias TO authenticated;
GRANT ALL ON public.licencias TO service_role;

ALTER TABLE public.licencias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cada usuario ve su propia licencia"
  ON public.licencias FOR SELECT TO authenticated
  USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

CREATE TABLE public.hotmart_eventos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  evento TEXT,
  transaction TEXT,
  email TEXT,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.hotmart_eventos TO service_role;
ALTER TABLE public.hotmart_eventos ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER licencias_updated_at BEFORE UPDATE ON public.licencias
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();