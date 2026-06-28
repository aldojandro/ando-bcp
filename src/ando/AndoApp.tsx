import { MobileFrame } from "@/components/mobile-frame"
import { DemoProvider, useDemo, type ScreenKey } from "@/ando/store"
import { P1Landing } from "@/ando/screens/p1-landing"
import { P3Reservada } from "@/ando/screens/p3-reservada"
import { P3bRetos } from "@/ando/screens/p3b-retos"

const SCREENS: Record<ScreenKey, () => React.JSX.Element> = {
  p1: P1Landing,
  p3: P3Reservada,
  p3b: P3bRetos,
}

function Router() {
  const { state } = useDemo()
  const Current = SCREENS[state.screen]

  return (
    <MobileFrame>
      {/* Re-mount on screen change so per-screen local state resets cleanly */}
      <Current key={state.screen} />
    </MobileFrame>
  )
}

export function AndoApp() {
  return (
    <DemoProvider>
      <Router />
    </DemoProvider>
  )
}
