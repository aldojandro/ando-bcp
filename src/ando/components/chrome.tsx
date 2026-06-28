import * as React from "react"
import { ChevronLeft, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { H3 } from "@/components/ui/typography"

/** Segmented onboarding progress bar (e.g. step 1 of 3). */
export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1 flex-1 rounded-full",
            i < step ? "bg-primary" : "bg-border/60"
          )}
        />
      ))}
    </div>
  )
}

/** BCP blue nav row. Icons are decorative, not clickable. */
export function BlueHeader({ title }: { title?: string }) {
  return (
    <div className="shrink-0 bg-bcp-blue text-white">
      <div className="flex min-h-14 items-center px-4 pt-5">
        <Menu className="size-6" />
        <H3 as="h2" className="flex-1 text-center">{title}</H3>
        <X className="size-6" />
      </div>
    </div>
  )
}

type TopBarProps = {
  title?: string
  onBack?: () => void
  onClose?: () => void
}

export function TopBar({ title, onBack, onClose }: TopBarProps) {
  return (
    <div className="mt-5 flex h-14 shrink-0 items-center px-4">
      <div className="w-6">
        {onBack && (
          <button onClick={onBack} aria-label="Atrás" className="text-on-text">
            <ChevronLeft className="size-6" />
          </button>
        )}
      </div>
      <H3 as="h2" className="flex-1 text-center text-on-text">{title}</H3>
      <div className="flex w-6 justify-end">
        {onClose && (
          <button onClick={onClose} aria-label="Cerrar" className="text-on-text">
            <X className="size-6" />
          </button>
        )}
      </div>
    </div>
  )
}

type ScreenProps = {
  title?: string
  onBack?: () => void
  onClose?: () => void
  progress?: { step: number; total: number }
  /** Custom header (e.g. <BlueHeader />). Replaces the default status/top bar. */
  header?: React.ReactNode
  /** Sticky footer, typically the primary CTA. */
  footer?: React.ReactNode
  /** Tone of the screen background. */
  className?: string
  contentClassName?: string
  children: React.ReactNode
}

/**
 * Standard screen scaffold: optional top bar → optional onboarding
 * progress → scrollable body (24px gutters) → sticky footer.
 */
export function Screen({
  title,
  onBack,
  onClose,
  progress,
  header,
  footer,
  className,
  contentClassName,
  children,
}: ScreenProps) {
  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {header ??
        ((title || onBack || onClose) && (
          <TopBar title={title} onBack={onBack} onClose={onClose} />
        ))}
      {progress && (
        <div className="px-6 pb-4 pt-1">
          <ProgressBar step={progress.step} total={progress.total} />
        </div>
      )}
      <div
        className={cn(
          "flex-1 overflow-y-auto px-6 pb-6",
          header ? "pt-6" : !title && !progress && "pt-6",
          contentClassName
        )}
      >
        {children}
      </div>
      {footer && (
        <div className="shrink-0 border-t border-border/40 bg-background px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  )
}
