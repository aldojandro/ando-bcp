import * as React from "react"

/* ------------------------------------------------------------------ */
/*  ANDO demo store — single happy path, persona Camila Rojas.         */
/*  State lives in memory only (no localStorage), per the brief.       */
/* ------------------------------------------------------------------ */

export type ScreenKey =
  | "p1"
  | "p2"
  | "p3"
  | "p3b"
  | "p4"
  | "p5"
  | "p6"
  | "p7"
  | "p8"
  | "p9"
  | "p10"
  | "p11"
  | "p12"
  | "p13"
  | "p14"
  | "p15"
  | "p16"

/** Linear happy-path order, driven by the primary CTAs. */
export const FLOW: ScreenKey[] = [
  "p1",
  "p2",
  "p3",
  "p3b",
  "p4",
  "p5",
  "p6",
  "p7",
  "p8",
  "p9",
  "p10",
  "p11",
  "p12",
  "p13",
  "p14",
  "p15",
  "p16",
]

export type Goal = {
  /** Chip label shown on the landing. */
  label: string
  /** Short noun used in goal-anchored copy ("tu laptop"). */
  noun: string
}

export type DemoState = {
  screen: ScreenKey
  goal: Goal
  goalAmount: number
  /** Current credit line plan (S/). 500 by default, 2000 after upgrade. */
  plan: number
  /** Monthly saving for the current plan (S/). */
  monthlySaving: number
  /** Money the user has put into Warda (S/). */
  warda: number
  /** Money usable today — the user's own money (S/). */
  available: number
  /** TarjetaANDO fill, 0–100. */
  cardProgress: number
  month: number
  remindersOn: boolean
}

const CAMILA: DemoState = {
  screen: "p1",
  goal: { label: "Equiparme (laptop, celular)", noun: "laptop" },
  goalAmount: 2000,
  plan: 500,
  monthlySaving: 100,
  warda: 0,
  available: 0,
  cardProgress: 0,
  month: 1,
  remindersOn: false,
}

type DemoContextValue = {
  state: DemoState
  /** Advance to the next screen in the happy path. */
  next: () => void
  goTo: (screen: ScreenKey) => void
  set: (patch: Partial<DemoState>) => void
  reset: () => void
}

const DemoContext = React.createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<DemoState>(CAMILA)

  const value = React.useMemo<DemoContextValue>(
    () => ({
      state,
      set: (patch) => setState((s) => ({ ...s, ...patch })),
      goTo: (screen) => setState((s) => ({ ...s, screen })),
      next: () =>
        setState((s) => {
          const i = FLOW.indexOf(s.screen)
          const screen = FLOW[Math.min(i + 1, FLOW.length - 1)]
          return { ...s, screen }
        }),
      reset: () => setState(CAMILA),
    }),
    [state]
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = React.useContext(DemoContext)
  if (!ctx) throw new Error("useDemo must be used within <DemoProvider>")
  return ctx
}

/** Money formatter — "S/ 2,000" (no decimals), per the copy rules. */
export function soles(n: number) {
  return `S/ ${n.toLocaleString("en-US")}`
}
