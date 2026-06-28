import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Mobile-only shell. Below the `sm` breakpoint (real phones, 320–639px) the
 * app fills the full viewport edge-to-edge — no letterboxing. At `sm` and up
 * (desktop browsers) it's locked to a phone-width column (max 390px) and
 * capped at 900px tall, centered on the page inside a device-like frame.
 */
export function MobileFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-app">
      <div
        className={cn(
          "relative flex h-dvh w-full flex-col overflow-hidden bg-background",
          "sm:max-h-[900px] sm:max-w-[390px] sm:shadow-[0_0_40px_rgba(32,46,68,0.12)]",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
