import * as React from "react"
import { Loader2, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Body2, Body3, H2, H3 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { useDemo } from "@/ando/store"

const STEPS = ["nombre", "documento", "nacimiento", "celular"] as const

export function P2Datos() {
  const { next, goTo } = useDemo()
  const [step, setStep] = React.useState(0)
  const [doc, setDoc] = React.useState<"DNI" | "CE">("DNI")
  const [code, setCode] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  // SMS code auto-fills once we reach the phone step.
  React.useEffect(() => {
    if (STEPS[step] === "celular") {
      const t = setTimeout(() => setCode("1234"), 900)
      return () => clearTimeout(t)
    }
  }, [step])

  function back() {
    if (step === 0) goTo("p1")
    else setStep((s) => s - 1)
  }

  function advance() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    // Last step → brief eligibility check → P3
    setLoading(true)
    setTimeout(() => next(), 1800)
  }

  if (loading) {
    return (
      <Screen>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <Loader2 className="size-10 animate-spin text-primary" />
          <H3 className="mt-6 text-on-text">
            Estamos viendo cómo empezar contigo…
          </H3>
        </div>
      </Screen>
    )
  }

  const current = STEPS[step]

  return (
    <Screen
      title="Crear mi cuenta"
      onBack={back}
      progress={{ step: step + 1, total: STEPS.length }}
      footer={
        <Button size="lg" className="w-full" onClick={advance}>
          {step < STEPS.length - 1 ? "Siguiente" : "Continuar"}
        </Button>
      }
    >
      <Body2 className="text-muted-foreground">
        Empecemos con lo básico. Toma menos de 2 minutos.
      </Body2>

      <div className="mt-6 flex flex-col gap-4">
        {current === "nombre" && (
          <>
            <H2 className="text-on-text">¿Cómo te llamas?</H2>
            <Field label="Nombres y apellidos" defaultValue="Camila Rojas" />
          </>
        )}

        {current === "documento" && (
          <>
            <H2 className="text-on-text">Tu documento</H2>
            <div className="flex gap-2">
              {(["DNI", "CE"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDoc(d)}
                  className={cn(
                    "flex-1 rounded-lg border py-3 text-body-2 font-semibold transition-colors",
                    doc === d
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {d === "DNI" ? "DNI" : "Carné de extranjería"}
                </button>
              ))}
            </div>
            <Field label="Número de documento" defaultValue="70123456" />
          </>
        )}

        {current === "nacimiento" && (
          <>
            <H2 className="text-on-text">¿Cuándo naciste?</H2>
            <div className="flex gap-2">
              <Field label="Día" defaultValue="14" containerClassName="flex-1" />
              <Field label="Mes" defaultValue="03" containerClassName="flex-1" />
              <Field
                label="Año"
                defaultValue="2000"
                containerClassName="flex-[1.4]"
              />
            </div>
          </>
        )}

        {current === "celular" && (
          <>
            <H2 className="text-on-text">Tu celular</H2>
            <Field
              label="Número de celular"
              defaultValue="987 654 321"
              helperText="Te enviaremos un código por SMS."
            />
            <Field
              label="Código SMS"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              helperText={code ? "Código verificado ✓" : "Esperando código…"}
            />
          </>
        )}
      </div>

      <div className="mt-6 flex gap-2 rounded-xl bg-secondary p-3">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-on-text" />
        <Body3 className="text-muted-foreground">
          Revisamos tu información en la central de riesgos para darte el mejor
          punto de partida. Esto no afecta tu historial.
        </Body3>
      </div>
    </Screen>
  )
}
