import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Body2, Body3 } from "@/components/ui/typography"

export type Piece = { label: string; done: boolean }

/** Checklist of "expediente" pieces with pending / done states. */
export function PieceList({ items }: { items: Piece[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((p) => (
        <li
          key={p.label}
          className={cn(
            "flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
            p.done
              ? "border-primary/30 bg-primary/5"
              : "border-border/60 bg-background"
          )}
        >
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
              p.done
                ? "border-primary bg-primary text-white"
                : "border-border text-transparent"
            )}
          >
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          <Body2
            as="span"
            className={cn(p.done ? "text-on-text" : "text-muted-foreground")}
          >
            {p.label}
          </Body2>
          {!p.done && (
            <Body3 as="span" className="ml-auto text-muted-foreground">
              pendiente
            </Body3>
          )}
        </li>
      ))}
    </ul>
  )
}
