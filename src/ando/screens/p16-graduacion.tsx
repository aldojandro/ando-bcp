import * as React from "react"
import { PartyPopper } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Body1, Body2, H1 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { TarjetaANDO } from "@/ando/components/tarjeta-ando"
import { soles, useDemo } from "@/ando/store"

export function P16Graduacion() {
  const { state, reset } = useDemo()
  const [activated, setActivated] = React.useState(false)

  return (
    <Screen
      className="bg-gradient-to-b from-primary/10 to-background"
      footer={
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            className="w-full"
            onClick={() => setActivated(true)}
          >
            {activated ? "¡Tarjeta activada! ✓" : "Activar mi tarjeta"}
          </Button>
          <Body2
            as="button"
            onClick={reset}
            className="font-semibold text-primary"
          >
            Ver el resumen de mi camino
          </Body2>
        </div>
      }
    >
      <div className="mt-2 flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/15">
          <PartyPopper className="size-8 text-primary" />
        </span>
        <H1 className="mt-5 text-on-text">
          ¡Lo lograste, Camila! Tu tarjeta de crédito BCP está desbloqueada.
        </H1>
      </div>

      <div className="my-6">
        <TarjetaANDO variant="desbloqueada" />
      </div>

      <Body1 className="text-on-text">
        Línea aprobada: <strong>{soles(state.plan)}</strong>. Tu ahorro de Warda
        (<strong>{soles(state.available)}</strong>) ya está disponible para ti.
      </Body1>
      <Body2 className="mt-3 text-muted-foreground">
        Ya puedes comprar tu {state.goal.noun} —y seguir construyendo tu
        historial con cada uso responsable.
      </Body2>
    </Screen>
  )
}
