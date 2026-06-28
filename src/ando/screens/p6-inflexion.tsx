import * as React from "react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Body1, Body2, H1 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { useDemo } from "@/ando/store"

export function P6Inflexion() {
  const { next } = useDemo()
  const [paused, setPaused] = React.useState(false)

  return (
    <Screen
      footer={
        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={next}>
            Sí, quiero construir mi tarjeta
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => setPaused(true)}
          >
            Prefiero verlo con calma
          </Button>
        </div>
      }
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Heart className="size-8 text-primary" />
        </span>
        <H1 className="mt-6 text-on-text">¿Lo construimos juntos?</H1>
        <Body1 className="mt-3 text-muted-foreground">
          Sin compromisos ni costos por empezar. Tú llevas el ritmo.
        </Body1>

        {paused && (
          <div className="mt-6 rounded-2xl bg-secondary p-4">
            <Body2 className="text-on-text">
              Te guardamos tu avance. Te escribiremos para retomar.
            </Body2>
            <Body2
              as="button"
              onClick={() => setPaused(false)}
              className="mt-2 font-semibold text-primary"
            >
              Volver
            </Body2>
          </div>
        )}
      </div>
    </Screen>
  )
}
