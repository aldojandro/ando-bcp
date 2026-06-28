import { Button } from "@/components/ui/button"
import { Screen } from "@/ando/components/chrome"
import { PorqueBlocks } from "@/ando/components/porque-blocks"
import { useDemo } from "@/ando/store"

export function P5Porque() {
  const { next, goTo } = useDemo()
  return (
    <Screen
      title="¿Por qué no es inmediata?"
      onBack={() => goTo("p4")}
      footer={
        <Button size="lg" className="w-full" onClick={next}>
          Lo tengo, sigamos
        </Button>
      }
    >
      <div className="mt-2">
        <PorqueBlocks />
      </div>
    </Screen>
  )
}
