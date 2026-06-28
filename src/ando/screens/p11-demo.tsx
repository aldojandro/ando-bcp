import { Button } from "@/components/ui/button"
import { Body2, H1 } from "@/components/ui/typography"
import { Screen } from "@/ando/components/chrome"
import { TarjetaANDO } from "@/ando/components/tarjeta-ando"
import { soles, useDemo } from "@/ando/store"

export function P11Demo() {
  const { next } = useDemo()
  return (
    <Screen
      footer={
        <Button size="lg" className="w-full" onClick={next}>
          Ver mi camino
        </Button>
      }
    >
      <H1 className="mt-2 text-on-text">
        ¡Mira esto! Tu tarjeta ya tiene tus primeros {soles(100)} y puedes
        usarlos hoy.
      </H1>

      <div className="my-5">
        <TarjetaANDO variant="demo" />
      </div>

      <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
        <Body2 className="text-on-text">
          Estos <strong>{soles(100)} son tuyos</strong>, no un préstamo. Es una
          muestra de cómo se sentirá tu tarjeta. Tu{" "}
          <strong>línea de crédito BCP</strong> la desbloqueas al completar tu
          expediente.
        </Body2>
      </div>

      <Body2 className="mt-4 text-muted-foreground">
        Desde el próximo mes, tu ahorro se guarda en Warda y simula el pago de
        tus cuotas. Lo recuperas cuando desbloquees tu tarjeta.
      </Body2>
    </Screen>
  )
}
