import { Button } from "@/components/ui/button"
import { Body1 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { TarjetaANDO } from "@/ando/components/tarjeta-ando"
import { useDemo } from "@/ando/store"

export function P4Tarjeta() {
  const { next, goTo } = useDemo()
  return (
    <Screen
      title="Tu tarjeta ANDO"
      onBack={() => goTo("p3")}
      footer={
        <Button size="lg" className="w-full" onClick={next}>
          ¿Cómo la lleno?
        </Button>
      }
    >
      <div className="mt-2">
        <TarjetaANDO variant="reservada" />
      </div>
      <Body1 className="mt-6 text-on-text">
        Esta es tu tarjeta ANDO. Hoy empieza vacía. Cada paso que des la va
        llenando, hasta desbloquear tu línea de crédito.
      </Body1>
    </Screen>
  )
}
