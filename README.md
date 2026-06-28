# ando-bcp

Base mobile-only para el reto BCP. Stack mínimo, sin back-end, corre 100% local con data fake.

## Stack

- **Vite + React + TypeScript** — sin servidor, build estático.
- **Tailwind CSS v4** — tokens de diseño como CSS variables.
- **shadcn/ui** — componentes base (`button`, `input`, `label`, `card`).
- **lucide-react** — set de iconos.

## Correr en local

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # typecheck + build de producción
```

## Mobile-only

La app se bloquea a un ancho de teléfono (máx. 420px) y se centra en cualquier
viewport vía [`MobileFrame`](src/components/mobile-frame.tsx). En desktop se ve la
misma vista mobile dentro de un marco tipo dispositivo.

## Style guide (Figma BCP)

Los tokens y componentes salen del [Figma del reto](https://www.figma.com/design/iJKjghdPpOCfC6NIlqTQHX/BCP-Reto---Product-Designer-Principal?node-id=11-8203).

- **Color tokens** y **tipografía** (escala `Flexo`: H1–H3, Body 1–3, etc.) en
  [`src/index.css`](src/index.css), mapeados a las variables semánticas de shadcn.
- **Botones** tipo pill (naranja `#ff7800`), variantes `default` / `outline`,
  tamaños `md` / `lg` en [`src/components/ui/button.tsx`](src/components/ui/button.tsx).
- **Inputs** con label, helper y estado de error en
  [`src/components/ui/field.tsx`](src/components/ui/field.tsx).
- Showcase de todo en [`src/App.tsx`](src/App.tsx).

> **Nota:** `Flexo` es la tipografía licenciada del BCP. No se incluye el archivo
> de fuente; el CSS la declara primero y cae a una stack sans-serif del sistema.
> Para fidelidad total, agrega los `.woff2` de Flexo y un `@font-face`.

## Data fake

Cuentas y movimientos de ejemplo en [`src/data/fake.ts`](src/data/fake.ts).
