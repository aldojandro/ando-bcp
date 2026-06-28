import { Clock, LockOpen, Puzzle } from "lucide-react"

import { Body2 } from "@/components/ui/typography"

/** The three "why it takes time" education blocks (shared by P5 and P1). */
const BLOCKS = [
  {
    icon: Puzzle,
    delay: "delay-100",
    text: (
      <>
        Para darte una línea de crédito, el banco necesita conocerte un poco:
        estar seguro de que podrás pagar sin ahogarte. A eso se le llama{" "}
        <strong className="text-on-text">historial crediticio</strong>, y se
        construye con el tiempo.
      </>
    ),
  },
  {
    icon: LockOpen,
    delay: "delay-200",
    text: (
      <>
        En ANDO lo construyes cumpliendo{" "}
        <strong className="text-on-text">retos</strong>. Cada reto es una{" "}
        <strong className="text-on-text">pieza de tu expediente</strong>: quién
        eres, cómo ahorras, cómo pagas. Cuando tu expediente está completo,{" "}
        <strong className="text-on-text">desbloqueas tu tarjeta</strong>.
      </>
    ),
  },
  {
    icon: Clock,
    delay: "delay-300",
    text: (
      <>
        ¿Cuánto demora? Depende de ti. Cumpliendo tus retos, puedes desbloquearla
        en <strong className="text-on-text">alrededor de 3 meses</strong>. Y verás
        tu avance en todo momento.
      </>
    ),
  },
]

export function PorqueBlocks() {
  return (
    <div className="flex flex-col gap-4">
      {BLOCKS.map((b, i) => {
        const Icon = b.icon
        return (
          <div
            key={i}
            className={`flex gap-3 rounded-2xl border border-border/60 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both ${b.delay}`}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Icon className="size-5 text-primary" />
            </span>
            <Body2 className="text-muted-foreground">{b.text}</Body2>
          </div>
        )
      })}
    </div>
  )
}
