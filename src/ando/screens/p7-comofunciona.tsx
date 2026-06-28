import { PiggyBank, ListChecks, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Body1, Body2, H1 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { useDemo } from "@/ando/store"

const POINTS = [
  { icon: PiggyBank, text: "Ahorras un poco cada mes." },
  { icon: ListChecks, text: "Cumples retos cortos." },
  { icon: CreditCard, text: "Desbloqueas tu tarjeta y recuperas tu ahorro." },
]

export function P7ComoFunciona() {
  const { next, goTo } = useDemo()
  return (
    <Screen
      title="Cómo funciona"
      onBack={() => goTo("p6")}
      footer={
        <Button size="lg" className="w-full" onClick={next}>
          Empezar
        </Button>
      }
    >
      <H1 className="mt-2 text-on-text">Así funciona, en simple:</H1>

      <div className="mt-6 flex flex-col gap-4">
        {POINTS.map((p, i) => {
          const Icon = p.icon
          return (
            <div key={i} className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-6" />
              </span>
              <Body1 className="text-on-text">
                <span className="mr-1 font-bold text-primary">{i + 1}.</span>
                {p.text}
              </Body1>
            </div>
          )
        })}
      </div>

      <Body2 className="mt-8 rounded-2xl bg-secondary p-4 text-muted-foreground">
        Empezamos suave. Tú decides si quieres crecer más adelante.
      </Body2>
    </Screen>
  )
}
