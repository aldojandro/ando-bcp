import * as React from "react"

/* ------------------------------------------------------------------ */
/*  ANDO demo store — single happy path, persona Camila Rojas.         */
/*  State lives in memory only (no localStorage), per the brief.       */
/* ------------------------------------------------------------------ */

export type ScreenKey = "p1" | "p3" | "p3b"

/** Linear happy-path order, driven by the primary CTAs. */
export const FLOW: ScreenKey[] = ["p1", "p3", "p3b"]

export type DemoState = {
  screen: ScreenKey
  goalAmount: number
  /** Current credit line plan (S/). Fallback shown before a goal is set. */
  plan: number
}

const CAMILA: DemoState = {
  screen: "p1",
  goalAmount: 2000,
  plan: 500,
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
