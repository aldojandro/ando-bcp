import { Wallet } from "lucide-react"

import { cn } from "@/lib/utils"
import { soles, useDemo } from "@/ando/store"

export type TarjetaVariant =
  | "reservada" // P4 — line S/ 0, 0%
  | "demo" // P11 — Disponible (tuyo) + línea en construcción
  | "enConstruccion" // P13–P15 — growing progress, two indicators
  | "desbloqueada" // P16 — line unlocked, 100%

/**
 * TarjetaANDO — the central object that fills up through the story.
 * A credit-card visual in BCP navy with an orange accent + progress bar.
 */
export function TarjetaANDO({ variant }: { variant: TarjetaVariant }) {
  const { state } = useDemo()
  const unlocked = variant === "desbloqueada"
  const showAvailable = variant === "demo" || variant === "enConstruccion"

  const lineValue = unlocked
    ? soles(state.plan)
    : variant === "reservada"
      ? soles(0)
      : "En construcción"

  return (
    <div
      className={cn(
        "relative min-h-[210px] w-full overflow-hidden rounded-2xl p-5 text-white shadow-lg",
        unlocked
          ? "bg-gradient-to-br from-primary to-[#e35c00]"
          : "bg-gradient-to-br from-on-text to-[#0d1626]"
      )}
    >
      {/* Brand row */}
      <div className="flex items-start justify-between">
        <p className="text-[18px] font-bold tracking-wide">ANDO</p>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-semibold",
            unlocked ? "bg-white/25 text-white" : "bg-primary/90 text-white"
          )}
        >
          {unlocked ? "Desbloqueada" : "En construcción"}
        </span>
      </div>

      {/* Chip */}
      <div className="mt-3 h-7 w-10 rounded-md bg-gradient-to-br from-yellow-200/90 to-yellow-400/70" />

      {/* Holder + line */}
      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-white/50">
            Titular
          </p>
          <p className="truncate text-[14px] font-semibold">Camila Rojas</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-white/50">
            Línea de crédito
          </p>
          <p className="text-[15px] font-bold">{lineValue}</p>
        </div>
      </div>

      {/* Available (the user's own money) */}
      {showAvailable && (
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-white/12 px-2.5 py-1.5 text-[12px]">
          <Wallet className="size-3.5 text-white/80" />
          <span className="text-white/80">Disponible (tuyo):</span>
          <span className="font-bold">{soles(state.available)}</span>
        </div>
      )}

      {/* Progress */}
      <div className="mt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700",
              unlocked ? "bg-white" : "bg-primary"
            )}
            style={{ width: `${state.cardProgress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
