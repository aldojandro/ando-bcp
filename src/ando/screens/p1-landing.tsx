import * as React from "react"
import { ChevronLeft, Eye, Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Body1, Body2, H1, H2, H3 } from "@/components/ui/typography"
import { PorqueBlocks } from "@/ando/components/porque-blocks"
import { soles, useDemo } from "@/ando/store"

/**
 * Organic blue gradient that fills the top (header + card). The white form
 * panel below is an opaque rounded sheet that floats over it, so the
 * blue→white transition reads as a natural bottom sheet.
 */
const GRADIENT_BG: React.CSSProperties = {
  background: `
    radial-gradient(60% 38% at 86% 22%, #3d77ff 0%, rgba(61, 119, 255, 0) 60%),
    radial-gradient(55% 36% at 6% 10%, #0a47f0 0%, rgba(10, 71, 240, 0) 55%),
    linear-gradient(170deg, #002a8d 0%, #0030b3 58%, #0a47f0 100%)
  `,
}

/** Tints the solid chevron asset (public/icons) to the current text color. */
const DROPDOWN_ICON: React.CSSProperties = {
  maskImage: "url(/icons/chevron-rown-rounded.svg)",
  WebkitMaskImage: "url(/icons/chevron-rown-rounded.svg)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
}

/** Dropdown styled to match the floating-label Field, with the chevron asset. */
function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  containerClassName,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder?: string
  containerClassName?: string
}) {
  return (
    <div className={cn("relative h-12 shrink-0", containerClassName)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-full w-full appearance-none rounded-lg border border-input bg-background pl-4 pr-9 text-[16px] font-semibold outline-none focus:border-ring",
          value ? "text-on-text" : "text-muted-foreground"
        )}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-background px-1 text-[12px] font-semibold text-label">
        {label}
      </label>
      <span
        aria-hidden
        style={DROPDOWN_ICON}
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 bg-on-text"
      />
    </div>
  )
}

const DOC_TYPES = ["DNI", "CE"]
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"))
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 63 }, (_, i) => String(CURRENT_YEAR - 18 - i))
const MONTO_AMOUNTS = [500, 800, 1200, 1600, 2000, 4000]
const MONTO_OPTIONS = MONTO_AMOUNTS.map((n) => soles(n))
const TOTAL_STEPS = 4

const STEP_HEADINGS = [
  "¿Cuánto necesitas?",
  "Ahora confirmemos que puedes acceder, coloca tu DNI.",
  "Coloca tu fecha de nacimiento.",
  "Coloca tu número de celular y luego pega el código.",
]

export function P1Landing() {
  const { state, set, goTo } = useDemo()
  const [step, setStep] = React.useState(0)
  const [montoLabel, setMontoLabel] = React.useState("")
  const [docType, setDocType] = React.useState(DOC_TYPES[0])
  const [dni, setDni] = React.useState("")
  const [dia, setDia] = React.useState(DAYS[0])
  const [mes, setMes] = React.useState(MONTHS[0])
  const [anio, setAnio] = React.useState(YEARS[0])
  const [celular, setCelular] = React.useState("")
  const [smsSent, setSmsSent] = React.useState(false)
  const [codigo, setCodigo] = React.useState("")
  const [showPorque, setShowPorque] = React.useState(false)
  const [validating, setValidating] = React.useState(false)

  const montoAmount = montoLabel ? Number(montoLabel.replace(/[^\d]/g, "")) : 0

  // Measure the card so we can shrink the space it occupies when collapsed.
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [cardH, setCardH] = React.useState(0)
  React.useLayoutEffect(() => {
    if (cardRef.current) setCardH(cardRef.current.offsetHeight)
  }, [])

  // Card stays full-size through Monto, then shrinks from DNI onward.
  const collapsed = step >= 1

  function sendSms() {
    setSmsSent(true)
    setTimeout(() => setCodigo("123456"), 1200)
  }

  function handleNext() {
    if (step === 0) {
      set({ goalAmount: montoAmount || state.goalAmount })
    }
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
      return
    }
    setValidating(true)
    setTimeout(() => goTo("p3"), 2200)
  }

  return (
    <div className="relative flex h-full flex-col text-white" style={GRADIENT_BG}>
      {/* Header — back (hidden on the Monto step) + logo + non-interactive close */}
      <div className="relative mt-6 flex h-11 shrink-0 items-center justify-center px-6">
        <div className="absolute left-4">
          {step > 0 && (
            <button
              type="button"
              aria-label="Atrás"
              onClick={() => setStep((s) => s - 1)}
              className="text-white/90"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}
        </div>
        <img src="/ando-logo.svg" alt="ANDO" className="h-5 w-auto" />
        <X className="absolute right-4 size-6 text-white/90" />
      </div>

      <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        {/* Title + description above the card */}
        <div className="px-6 pt-1">
          <H1 className="text-white text-center">Tu tarjeta en solo 3 meses</H1>
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-out",
              collapsed ? "mt-0 max-h-0 opacity-0" : "mt-2 max-h-24 opacity-100"
            )}
          >
            <Body2 className="text-white/80 text-center">
              Cumple retos, ahorra a tu ritmo y desbloquéala.
            </Body2>
          </div>
        </div>

        {/* Live glassmorphism card — shrinks once past the DNI step */}
        <div className="relative px-6 pb-6 pt-5">
          <div className="pointer-events-none absolute -left-6 top-2 size-40 rounded-full bg-primary-300/50 blur-2xl" />
          <div className="pointer-events-none absolute -right-4 bottom-2 size-40 rounded-full bg-secondary-500/30 blur-2xl" />

          <div
            className="overflow-visible transition-[height] duration-500 ease-out"
            style={{
              height: cardH ? (collapsed ? cardH * 0.62 : cardH) : undefined,
            }}
          >
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-3xl border border-white/25 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-out"
              style={{
                transform: collapsed ? "scale(0.62)" : "scale(1)",
                transformOrigin: "top center",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/60">
                  Línea por desbloquear
                </p>
                <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold">
                  En construcción
                </span>
              </div>

              <p className="mt-3 text-3xl font-bold tracking-tight">
                {montoAmount ? soles(montoAmount) : "..."}
              </p>

              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-secondary-400 to-secondary-500"
                    style={{ width: "0%" }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] font-medium text-white/70">
                  <span>S/ 0</span>
                  <span>{montoAmount ? soles(montoAmount) : "..."}</span>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50">
                    Titular
                  </p>
                  <p className="truncate text-sm font-semibold uppercase">
                    Tu nombre
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
        </div>

        {/* White form sheet */}
        <div className="flex flex-1 flex-col rounded-t-3xl bg-background px-6 pb-6 pt-7 text-on-text shadow-[0_-10px_40px_rgba(0,20,80,0.25)]">
          {/* Step progress — same bar style as "Crear mi cuenta" (P2) */}
          <div className="mb-4 flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full",
                  i <= step ? "bg-primary-700" : "bg-primary-040"
                )}
              />
            ))}
          </div>

          <H3 className="text-on-text">{STEP_HEADINGS[step]}</H3>

          {/* Step content */}
          <div className="mt-6 flex flex-col gap-1">
            {step === 0 && (
              <SelectField
                label="Monto"
                value={montoLabel}
                onChange={setMontoLabel}
                options={MONTO_OPTIONS}
                placeholder="Selecciona un monto"
              />
            )}

            {step === 1 && (
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-3">
                  <SelectField
                    label="Tipo"
                    value={docType}
                    onChange={setDocType}
                    options={DOC_TYPES}
                    containerClassName="w-28"
                  />
                  <Field
                    label="N° de documento"
                    inputMode="numeric"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    trailing={<Eye />}
                    containerClassName="flex-1"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex gap-3">
                <SelectField
                  label="Día"
                  value={dia}
                  onChange={setDia}
                  options={DAYS}
                  containerClassName="flex-1"
                />
                <SelectField
                  label="Mes"
                  value={mes}
                  onChange={setMes}
                  options={MONTHS}
                  containerClassName="flex-1"
                />
                <SelectField
                  label="Año"
                  value={anio}
                  onChange={setAnio}
                  options={YEARS}
                  containerClassName="flex-[1.4]"
                />
              </div>
            )}

            {step === 3 && (
              <>
                <Field
                  label="Número de celular"
                  inputMode="tel"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full mb-4"
                  onClick={sendSms}
                >
                  {smsSent ? "Reenviar código por SMS" : "Enviar código por SMS"}
                </Button>
                {smsSent && (
                  <Field
                    label="Código SMS"
                    inputMode="numeric"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    helperText={
                      codigo
                        ? "Código verificado ✓"
                        : "Te enviamos un código por SMS."
                    }
                  />
                )}
              </>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-7">
            <Button size="lg" className="w-full" onClick={handleNext}>
              Continuar
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => setShowPorque(true)}
            >
              ¿Por qué 3 meses?
            </Button>
          </div>
        </div>
      </div>

      {/* "¿Por qué 3 meses?" overlay — same content as P5, no back */}
      {showPorque && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background text-on-text animate-in fade-in duration-500 ease-out">
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-8">
            <H1 className="text-on-text animate-in fade-in slide-in-from-top-2 duration-500 ease-out">
              ¿Por qué 3 meses?
            </H1>
            <div className="mt-5">
              <PorqueBlocks />
            </div>
          </div>
          <div className="shrink-0 border-t border-border/40 bg-background px-6 py-4 animate-in fade-in slide-in-from-bottom-4 delay-500 duration-700 ease-out fill-mode-both">
            <Button
              size="lg"
              className="w-full"
              onClick={() => setShowPorque(false)}
            >
              Entendido
            </Button>
          </div>
        </div>
      )}

      {/* Validation loading overlay */}
      {validating && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background text-on-text">
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <Loader2 className="size-10 animate-spin text-primary" />
            <H2 className="mt-6 text-on-text">Estamos validando tus datos…</H2>
            <Body1 className="mt-3 text-muted-foreground">
              Verificamos tu identidad para crear tu tarjeta a tu nombre. Toma
              solo unos segundos.
            </Body1>
          </div>
        </div>
      )}
    </div>
  )
}
