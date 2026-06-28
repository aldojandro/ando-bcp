import * as React from "react"
import { Briefcase, ChevronRight, ChevronDown, PiggyBank, X } from "lucide-react"

import { Body2, Body3, H2, H3 } from "@/components/ui/typography"

const GRADIENT_BG: React.CSSProperties = {
  background: `
    radial-gradient(60% 38% at 86% 22%, #3d77ff 0%, rgba(61, 119, 255, 0) 60%),
    radial-gradient(55% 36% at 6% 10%, #0a47f0 0%, rgba(10, 71, 240, 0) 55%),
    linear-gradient(170deg, #002a8d 0%, #0030b3 58%, #0a47f0 100%)
  `,
}

const RETOS = [
  {
    icon: Briefcase,
    eyebrow: "Reto 1",
    question: "Cuéntanos dónde trabajas",
    time: "2 min",
    info: false,
    delay: "delay-200",
  },
  {
    icon: PiggyBank,
    eyebrow: "Reto 2",
    question: "Ahorra S/ 100 en Warda",
    time: "5 min",
    info: true,
    delay: "delay-300",
  },
]

export function P3bRetos() {
  // Measure the reward banner so the scrollable area reserves exactly
  // enough space — its height varies with viewport width (text wraps).
  const bannerRef = React.useRef<HTMLDivElement>(null)
  const [bannerH, setBannerH] = React.useState(0)
  React.useLayoutEffect(() => {
    function measure() {
      if (bannerRef.current) setBannerH(bannerRef.current.offsetHeight)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return (
    <div className="relative flex h-full flex-col text-white" style={GRADIENT_BG}>
      {/* Single scroll container — everything above the banner scrolls together */}
      <div
        className="flex flex-1 flex-col overflow-y-auto"
        style={{ paddingBottom: bannerH ? bannerH + 24 : 192 }}
      >
        {/* Brand row — close icon is decorative, not clickable */}
        <div className="relative mt-6 flex h-11 shrink-0 items-center justify-center px-6">
          <img src="/ando-logo.svg" alt="ANDO" className="h-5 w-auto" />
          <X className="absolute right-4 size-6 text-white/90" />
        </div>

        {/* Phase header */}
        <div className="shrink-0 px-6 pb-6 pt-4 flex flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-500 ease-out">
          <div className="flex-vertical items-center justify-left">
            <H3 as="h1" className="text-white">Fase 1 · 0/2 retos completados</H3>
            <Body2 className="text-white/90">Tienes hasta el 5 de julio</Body2>
          </div>
          <div>
            <ChevronDown
              aria-hidden
              className="size-5 text-white"
            />
          </div>
        </div>

        {/* White content sheet */}
        <div className="flex flex-1 flex-col rounded-t-3xl bg-background px-6 pt-6 text-on-text animate-in fade-in duration-500 ease-out">
          <H3 className="text-on-text animate-in fade-in slide-in-from-bottom-3 delay-100 duration-500 ease-out fill-mode-both">
            Dos retos para arrancar tu historial.
          </H3>

          <div className="mt-5 flex flex-col gap-4">
            {RETOS.map((r) => {
              const Icon = r.icon
              return (
                <div
                  key={r.eyebrow}
                  className={`flex items-center gap-4 rounded-2xl border border-border/60 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both ${r.delay}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Body2 className="text-on-text">
                      {r.eyebrow}
                    </Body2>
                    <div className="mt-1 flex items-center gap-1">
                      <H2 as="span" className="font-semibold text-primary-500">
                        {r.question}
                      </H2>
                    </div>
                    <Body3 className="mt-2 text-muted-foreground">
                      Tiempo estimado: {r.time}
                    </Body3>
                  </div>
                  <ChevronRight
                    aria-hidden
                    className="size-5 shrink-0 text-muted-foreground"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Reward banner — pinned to the bottom of the viewport, illustration
          pokes out above the diagonal cut to read as a prize waiting to be claimed. */}
      <div
        ref={bannerRef}
        className="absolute inset-x-0 bottom-0 animate-in fade-in slide-in-from-bottom-8 delay-500 duration-700 ease-out fill-mode-both"
      >
        <div className="relative">
          <div
            className="bg-primary-300 px-6 pb-8 pt-12"
            style={{
              clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 100%)",
            }}
          >
            <div className="max-w-[65%]">
              <H2 className="text-white font-bold">
                Al completar esta Fase ¡Tu tarjeta tendrá saldo!
              </H2>
              <Body3 className="mt-2 text-white">
                Cargaremos tus S/ 100 para que empieces a probarla hoy con
                pagos digitales, sin esperar los 3 meses.
              </Body3>
            </div>
          </div>
          <img
            src="/girl-with-phone.svg"
            alt=""
            className="pointer-events-none absolute bottom-0 -right-18 size-50"
          />
        </div>
      </div>
    </div>
  )
}
