import { MobileFrame } from "@/components/mobile-frame"
import { DemoProvider, useDemo, type ScreenKey } from "@/ando/store"
import { P1Landing } from "@/ando/screens/p1-landing"
import { P2Datos } from "@/ando/screens/p2-datos"
import { P3Reservada } from "@/ando/screens/p3-reservada"
import { P3bRetos } from "@/ando/screens/p3b-retos"
import { P4Tarjeta } from "@/ando/screens/p4-tarjeta"
import { P5Porque } from "@/ando/screens/p5-porque"
import { P6Inflexion } from "@/ando/screens/p6-inflexion"
import { P7ComoFunciona } from "@/ando/screens/p7-comofunciona"
import { P8PrimerPaso } from "@/ando/screens/p8-primerpaso"
import { P9Warda } from "@/ando/screens/p9-warda"
import { P10Verificando } from "@/ando/screens/p10-verificando"
import { P11Demo } from "@/ando/screens/p11-demo"
import { P12Camino } from "@/ando/screens/p12-camino"
import { P13Expediente } from "@/ando/screens/p13-expediente"
import { P14Upgrade } from "@/ando/screens/p14-upgrade"
import { P15Meses } from "@/ando/screens/p15-meses"
import { P16Graduacion } from "@/ando/screens/p16-graduacion"

const SCREENS: Record<ScreenKey, () => React.JSX.Element> = {
  p1: P1Landing,
  p2: P2Datos,
  p3: P3Reservada,
  p3b: P3bRetos,
  p4: P4Tarjeta,
  p5: P5Porque,
  p6: P6Inflexion,
  p7: P7ComoFunciona,
  p8: P8PrimerPaso,
  p9: P9Warda,
  p10: P10Verificando,
  p11: P11Demo,
  p12: P12Camino,
  p13: P13Expediente,
  p14: P14Upgrade,
  p15: P15Meses,
  p16: P16Graduacion,
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
