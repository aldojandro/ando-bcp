import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Body2, Body3, H1 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { soles, useDemo } from "@/ando/store"

const ROWS = [
  { line: 500, save: 100 },
  { line: 800, save: 200 },
  { line: 1200, save: 300 },
  { line: 1600, save: 400 },
  { line: 2000, save: 500 },
]

export function P12Camino() {
  const { state, next, goTo } = useDemo()

  return (
    <Screen
      title="Tu camino"
      onBack={() => goTo("p11")}
      footer={
        <Button size="lg" className="w-full" onClick={next}>
          Entendido, ¡sigamos!
        </Button>
      }
    >
      <H1 className="mt-2 text-on-text">
        Tu camino hacia tu {state.goal.noun}
      </H1>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border/60">
        <Body3 as="div" className="flex bg-secondary px-4 py-3 font-semibold text-muted-foreground">
          <span className="flex-1">Línea</span>
          <span>Ahorro mensual</span>
        </Body3>
        {ROWS.map((r) => {
          const here = r.line === state.plan
          const meta = r.line === state.goalAmount
          return (
            <div
              key={r.line}
              className={cn(
                "flex items-center border-t border-border/40 px-4 py-3 text-body-2",
                here && "bg-primary/5",
                meta && "bg-primary/10"
              )}
            >
              <span className="flex-1 font-semibold text-on-text">
                {soles(r.line)}
                {here && (
                  <Body3 as="span" className="ml-2 font-normal text-primary">
                    (estás aquí)
                  </Body3>
                )}
                {meta && (
                  <Body3 as="span" className="ml-2 font-normal text-primary">
                    (tu meta)
                  </Body3>
                )}
              </span>
              <span
                className={cn(
                  "font-semibold",
                  meta ? "text-primary" : "text-on-text"
                )}
              >
                {soles(r.save)}
              </span>
            </div>
          )
        })}
      </div>

      <Body2 className="mt-5 text-muted-foreground">
        Estás en {soles(state.plan)}. Para llegar a tu meta de{" "}
        {soles(state.goalAmount)}, el próximo mes podrás subir tu plan. Mientras
        más cumples, más cerca.
      </Body2>
    </Screen>
  )
}
