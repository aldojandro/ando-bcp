import { Button } from "@/components/ui/button"
import { Body2, Body3, H1, H2 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { TarjetaANDO } from "@/ando/components/tarjeta-ando"
import { PieceList } from "@/ando/components/pieces"
import { soles, useDemo } from "@/ando/store"

const MILESTONES = [
  "Dónde trabajas",
  "Presupuesto del mes",
  "Ahorro del mes",
  "Al día con tus pagos",
]

export function P15Meses() {
  const { state, set, next } = useDemo()
  const isLastMonth = state.month >= 3

  function advance() {
    if (!isLastMonth) {
      // Month 2 → Month 3
      set({
        month: 3,
        warda: state.warda + state.monthlySaving,
        cardProgress: 90,
      })
    } else {
      // Graduate → release savings
      set({ cardProgress: 100, available: state.warda })
      next()
    }
  }

  return (
    <Screen
      footer={
        <Button size="lg" className="w-full" onClick={advance}>
          {isLastMonth ? "Ver mi resultado" : "Avanzar al Mes 3"}
        </Button>
      }
    >
      <H1 className="mt-2 text-on-text">
        Mes {state.month} · Construyendo tu historial
      </H1>

      <div className="my-5">
        <TarjetaANDO variant="enConstruccion" />
      </div>

      <PieceList items={MILESTONES.map((label) => ({ label, done: true }))} />

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-secondary p-4">
        <Body2 as="span" className="text-muted-foreground">
          Tu ahorro en Warda
        </Body2>
        <H2 as="span" className="text-on-text">{soles(state.warda)}</H2>
      </div>
      <Body3 className="mt-2 text-muted-foreground">y subiendo.</Body3>
    </Screen>
  )
}
