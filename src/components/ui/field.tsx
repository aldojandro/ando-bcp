import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * BCP form field with a floating ("notched") label.
 *
 * - Empty + unfocused: the label sits inside the field like a placeholder.
 * - Focused or filled: the label shrinks and embeds into the top border,
 *   Google / Material outlined-input style.
 *
 * Pure-CSS behaviour driven by `:placeholder-shown` (the input keeps a blank
 * placeholder), so no controlled state is required.
 */
type FieldProps = Omit<React.ComponentProps<"input">, "placeholder"> & {
  label: string
  helperText?: string
  error?: boolean
  /** Leading adornment, e.g. a "S/" currency prefix. */
  leading?: React.ReactNode
  /** Trailing adornment, e.g. a Lucide <Eye /> icon. */
  trailing?: React.ReactNode
  containerClassName?: string
}

function Field({
  id,
  label,
  helperText,
  error = false,
  leading,
  trailing,
  className,
  containerClassName,
  ...props
}: FieldProps) {
  const reactId = React.useId()
  const inputId = id ?? reactId

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      <div
        className={cn(
          "relative flex h-12 items-center rounded-lg border bg-background",
          "transition-colors focus-within:border-ring",
          error ? "border-destructive" : "border-input"
        )}
      >
        <input
          id={inputId}
          data-slot="field-input"
          placeholder=" "
          aria-invalid={error || undefined}
          className={cn(
            "peer h-full w-full min-w-0 bg-transparent px-4 pt-2 text-[16px] font-semibold text-on-text outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            leading && "pl-9",
            trailing && "pr-12",
            className
          )}
          {...props}
        />

        {leading && (
          <span className="pointer-events-none absolute left-4 z-10 text-[16px] font-semibold text-muted-foreground">
            {leading}
          </span>
        )}

        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-3 z-10 origin-left bg-background px-1 transition-all duration-150 ease-out",
            // Floated (default — filled or focused): sits on the top border
            "top-0 -translate-y-1/2 text-[12px] font-semibold",
            // Resting (empty + unfocused): acts as a placeholder inside the field
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[16px] peer-placeholder-shown:font-semibold",
            // Re-float on focus even when empty
            "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[12px] peer-focus:font-semibold",
            error ? "text-destructive" : "text-label"
          )}
        >
          {label}
        </label>

        {trailing && (
          <span className="absolute right-4 flex shrink-0 items-center text-label [&_svg]:size-5">
            {trailing}
          </span>
        )}
      </div>

      {helperText && (
        <p
          className={cn(
            "px-4 text-[12px] font-normal leading-none",
            error ? "text-destructive" : "text-label"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

export { Field }
