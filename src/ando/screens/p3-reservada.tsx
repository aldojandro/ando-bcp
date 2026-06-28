import { Button } from "@/components/ui/button"
import { Body1, H1 } from "@/components/ui/typography"
import { soles, useDemo } from "@/ando/store"

const GRADIENT_BG: React.CSSProperties = {
  background: `
    radial-gradient(60% 38% at 86% 22%, #3d77ff 0%, rgba(61, 119, 255, 0) 60%),
    radial-gradient(55% 36% at 6% 10%, #0a47f0 0%, rgba(10, 71, 240, 0) 55%),
    linear-gradient(170deg, #002a8d 0%, #0030b3 58%, #0a47f0 100%)
  `,
}

export function P3Reservada() {
  const { state, next } = useDemo()
  const amount = state.goalAmount || state.plan

  return (
    <div
      className="relative flex h-full flex-col text-white"
      style={GRADIENT_BG}
    >
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 pb-6 pt-12">
        {/* Glassmorphism card — populated with user data */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute -left-6 top-2 size-40 rounded-full bg-primary-300/50 blur-2xl" />
          <div className="pointer-events-none absolute -right-4 bottom-2 size-40 rounded-full bg-secondary-500/30 blur-2xl" />

          <div className="relative animate-in zoom-in-75 fade-in overflow-hidden rounded-3xl border border-white/25 bg-white/10 p-6 shadow-2xl backdrop-blur-xl duration-700 ease-out">
            {/* Brand row */}
            <div className="flex items-center justify-between">
              <img src="/ando-logo.svg" alt="ANDO" className="h-5 w-auto" />
              <img
                src="/visa-logo.png"
                alt="Visa"
                className="h-5 w-auto brightness-0 invert"
              />
            </div>

            {/* Chip */}
            <div className="mt-3 h-7 w-10 rounded-md bg-gradient-to-br from-yellow-200/90 to-yellow-400/70" />

            {/* Amount */}
            <p className="mt-3 text-3xl font-bold tracking-tight">
              {soles(amount)}
            </p>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-secondary-400 to-secondary-500"
                  style={{ width: "0%" }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] font-medium text-white/70">
                <span>S/ 0</span>
                <span>{soles(amount)}</span>
              </div>
            </div>

            {/* Holder + unlock time */}
            <div className="mt-5 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/50">
                  Titular
                </p>
                <p className="truncate text-sm font-semibold uppercase">
                  Camila Rojas
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/50">
                  Desbloqueas en
                </p>
                <p className="text-sm font-semibold">~3 meses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Title + description + CTA — all on the gradient, centered */}
        <H1 className="mt-8 text-center text-white">
          ¡Tu tarjeta BCP <br /> ya está reservada!
        </H1>
        <Body1 className="mt-3 text-center text-white">
          Completa los retos, ahorra cada mes y en 3 meses ya la tendrás activa.
        </Body1>

        <Button size="lg" className="mt-8 w-full" onClick={next}>
          Comenzar mi primer reto
        </Button>
      </div>
    </div>
  )
}
