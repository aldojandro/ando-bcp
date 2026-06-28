import { PiggyBank, Hand, Repeat } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Body2, H1 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { soles, useDemo } from "@/ando/store"

export function P9Warda() {
  const { next, goTo } = useDemo()
  return (
    <Screen
      title="Tu primer reto"
      onBack={() => goTo("p3b")}
      footer={
        <Button size="lg" className="w-full" onClick={next}>
          Guardar {soles(100)}
        </Button>
      }
    >
      <div className="mt-2 flex justify-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-primary/10">
          <PiggyBank className="size-10 text-primary" />
        </span>
      </div>

      <H1 className="mt-5 text-center text-on-text">
        Tu primer reto: guarda {soles(100)} en Warda.
      </H1>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-3">
          <PiggyBank className="mt-0.5 size-5 shrink-0 text-primary" />
          <Body2 className="text-muted-foreground">
            <strong className="text-on-text">Warda</strong> es tu alcancía dentro
            de ANDO. Aquí guardas tu ahorro, lo ves crecer y lo puedes retirar
            cuando desbloquees tu tarjeta.
          </Body2>
        </div>
        <div className="flex gap-3">
          <Hand className="mt-0.5 size-5 shrink-0 text-primary" />
          <Body2 className="text-muted-foreground">
            Tú decides cuándo y cuánto depositar.
          </Body2>
        </div>
        <div className="flex gap-3">
          <Repeat className="mt-0.5 size-5 shrink-0 text-primary" />
          <Body2 className="text-muted-foreground">
            Puedes hacerlo de una o de a pocos.
          </Body2>
        </div>
      </div>
    </Screen>
  )
}
