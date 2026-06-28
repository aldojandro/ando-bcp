import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Body2, Body3, H1, H2 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { soles, useDemo } from "@/ando/store"

const LADDER = [500, 800, 1200, 1600, 2000]

export function P8PrimerPaso() {
  const { state, next, goTo } = useDemo()

  return (
    <Screen
      title="Tu primer paso"
      onBack={() => goTo("p7")}
      footer={
        <Button size="lg" className="w-full" onClick={next}>
          Empezar mi primer reto
        </Button>
      }
    >
      <H1 className="mt-2 text-on-text">
        Empieza por aquí: tu primer paso.
      </H1>

      {/* Plan card */}
      <div className="mt-5 rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <Body3 className="font-semibold uppercase tracking-wide text-primary">
          Plan inicial
        </Body3>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <Body3 className="text-muted-foreground">Línea</Body3>
            <H1 as="p" className="text-on-text">{soles(500)}</H1>
          </div>
          <div className="text-right">
            <Body3 className="text-muted-foreground">
              Ahorro de este mes
            </Body3>
            <H2 as="p" className="text-on-text">{soles(100)}</H2>
          </div>
        </div>
      </div>

      <Body2 className="mt-5 text-muted-foreground">
        Tu meta: {state.goal.noun} (~{soles(state.goalAmount)}). Empiezas en{" "}
        {soles(500)} para que sea fácil. Desde el próximo mes puedes subir hacia
        tu meta, según cómo te vaya.
      </Body2>

      {/* Mini-map */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          {LADDER.map((v, i) => {
            const current = v === state.plan
            const meta = v === state.goalAmount
            return (
              <div key={v} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex size-3.5 items-center justify-center rounded-full border-2",
                      current
                        ? "border-primary bg-primary"
                        : meta
                          ? "border-primary bg-background"
                          : "border-border bg-background"
                    )}
                  />
                  <span
                    className={cn(
                      "mt-1.5 whitespace-nowrap text-[10px] font-semibold",
                      current || meta ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {soles(v)}
                  </span>
                  {(current || meta) && (
                    <span className="text-[9px] text-muted-foreground">
                      {current ? "estás aquí" : "tu meta"}
                    </span>
                  )}
                </div>
                {i < LADDER.length - 1 && (
                  <span className="mx-1 h-0.5 flex-1 self-start rounded-full bg-border" style={{ marginTop: 6 }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <Body2 className="mt-7 rounded-2xl bg-secondary p-4 text-muted-foreground">
        No tienes que decidir el monto final hoy. Solo da el primer paso.
      </Body2>
    </Screen>
  )
}
