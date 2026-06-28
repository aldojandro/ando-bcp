import * as React from "react"
import { Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Body1, Body2, H1, H2 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { soles, useDemo } from "@/ando/store"

export function P10Verificando() {
  const { next, set } = useDemo()
  const [done, setDone] = React.useState(false)

  function confirm() {
    set({ warda: 100, available: 100, cardProgress: 15 })
    setDone(true)
  }

  return (
    <Screen
      footer={
        done ? (
          <Button size="lg" className="w-full" onClick={next}>
            Ver mi tarjeta
          </Button>
        ) : (
          <Button size="lg" variant="outline" className="w-full" onClick={confirm}>
            Simular confirmación
          </Button>
        )
      }
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        {done ? (
          <>
            <CheckCircle2 className="size-16 text-primary" />
            <H1 className="mt-6 text-on-text">
              ¡Listo! Tus {soles(100)} están guardados.
            </H1>
          </>
        ) : (
          <>
            <Loader2 className="size-12 animate-spin text-primary" />
            <H2 as="h1" className="mt-6 text-on-text">
              Estamos confirmando tu ahorro…
            </H2>
            <Body1 className="mt-3 text-muted-foreground">
              Suele tomar solo unos minutos. Te avisamos apenas esté listo.
            </Body1>
            <Body2 as="button" className="mt-6 font-semibold text-primary">
              ¿Algo no cuadra? Escríbenos aquí.
            </Body2>
          </>
        )}
      </div>
    </Screen>
  )
}
