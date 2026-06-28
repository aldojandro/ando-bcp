import * as React from "react"
import { Bell, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Body2, Body3 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { TarjetaANDO } from "@/ando/components/tarjeta-ando"
import { PieceList } from "@/ando/components/pieces"
import { useDemo } from "@/ando/store"

const PENDING = ["Cuéntanos dónde trabajas", "Arma tu presupuesto del mes"]

export function P13Expediente() {
  const { next, set, state } = useDemo()
  const [doneCount, setDoneCount] = React.useState(0)
  const [celebrate, setCelebrate] = React.useState(false)
  const [reminders, setReminders] = React.useState(state.remindersOn)

  const allDone = doneCount >= PENDING.length

  const items = [
    { label: "Identidad", done: true },
    { label: "Primer ahorro (S/ 100)", done: true },
    ...PENDING.map((label, i) => ({ label, done: i < doneCount })),
  ]

  function completeOne() {
    setDoneCount((c) => Math.min(c + 1, PENDING.length))
    set({ cardProgress: Math.min(35, state.cardProgress + 10) })
    setCelebrate(true)
    setTimeout(() => setCelebrate(false), 1600)
  }

  return (
    <Screen
      title="Tu expediente · Mes 1"
      footer={
        allDone ? (
          <Button size="lg" className="w-full" onClick={next}>
            Continuar al Mes 2
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={completeOne}>
            Completar un reto
          </Button>
        )
      }
    >
      <div className="mt-2">
        <TarjetaANDO variant="enConstruccion" />
      </div>

      {celebrate && (
        <Body2 as="div" className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 font-semibold text-primary">
          <Sparkles className="size-4" />
          ¡Pieza sumada a tu expediente!
        </Body2>
      )}

      <div className="mt-5">
        <PieceList items={items} />
      </div>

      <button
        onClick={() => {
          setReminders(true)
          set({ remindersOn: true })
        }}
        className="mt-4 flex w-full items-center gap-3 rounded-xl border border-border/60 px-4 py-3 text-left"
      >
        <Bell className="size-5 text-primary" />
        <Body2 as="span" className="flex-1 text-muted-foreground">
          Te recordamos tus retos para que no se te pasen.
        </Body2>
        <Body2 as="span" className="font-semibold text-primary">
          {reminders ? "Activado ✓" : "Activar"}
        </Body2>
      </button>

      <Body3 className="mt-4 text-muted-foreground">
        ¿Se te pasó un día? Tranquila, no pierdes tu avance.
      </Body3>
    </Screen>
  )
}
