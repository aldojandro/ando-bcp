import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Body1, Body2, Body3, H1, H2 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { soles, useDemo } from "@/ando/store"

export function P14Upgrade() {
  const { state, set, next } = useDemo()

  function grow() {
    set({
      plan: 2000,
      monthlySaving: 500,
      month: 2,
      warda: state.warda + 500,
      cardProgress: 45,
    })
    next()
  }
  function stay() {
    set({ month: 2, warda: state.warda + 100, cardProgress: 45 })
    next()
  }

  return (
    <Screen
      footer={
        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={grow}>
            Sí, quiero crecer hacia mi {state.goal.noun}
          </Button>
          <Button size="lg" variant="outline" className="w-full" onClick={stay}>
            Me quedo en {soles(500)} por ahora
          </Button>
          <Body3 className="text-center text-muted-foreground">
            Cualquiera de las dos está bien. Tú decides el ritmo.
          </Body3>
        </div>
      }
    >
      <H1 className="mt-2 text-on-text">¡Completaste tu Mes 1! 🎉</H1>
      <Body1 className="mt-3 text-muted-foreground">
        Vas muy bien, Camila. ¿Quieres acercarte a tu meta de{" "}
        {soles(state.goalAmount)}?
      </Body1>

      {/* Plan comparison */}
      <div className="mt-6 flex items-stretch gap-3">
        <div className="flex-1 rounded-2xl border border-border/60 p-4">
          <Body3 className="text-muted-foreground">Plan actual</Body3>
          <H2 as="p" className="mt-1 text-on-text">{soles(500)}</H2>
          <Body3 className="mt-2 text-muted-foreground">
            Ahorro {soles(100)}/mes
          </Body3>
        </div>
        <div className="flex items-center">
          <ArrowRight className="size-5 text-primary" />
        </div>
        <div className="flex-1 rounded-2xl border-2 border-primary bg-primary/5 p-4">
          <Body3 className="font-semibold text-primary">Plan meta</Body3>
          <H2 as="p" className="mt-1 text-on-text">{soles(2000)}</H2>
          <Body3 className="mt-2 text-muted-foreground">
            Ahorro {soles(500)}/mes
          </Body3>
        </div>
      </div>

      <Body2 className="mt-6 text-on-text">
        Sube tu plan a <strong>{soles(2000)}</strong>. Tu ahorro mensual pasaría
        a <strong>{soles(500)}</strong> desde este mes.
      </Body2>
    </Screen>
  )
}
