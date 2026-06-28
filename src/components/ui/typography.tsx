import * as React from "react"

import { cn } from "@/lib/utils"

type TypoProps = React.ComponentProps<"p"> & { as?: React.ElementType }

export function H1({ as: Comp = "h1", className, ...props }: TypoProps) {
  return <Comp className={cn("text-h1", className)} {...props} />
}

export function H2({ as: Comp = "h2", className, ...props }: TypoProps) {
  return <Comp className={cn("text-h2", className)} {...props} />
}

export function H3({ as: Comp = "h3", className, ...props }: TypoProps) {
  return <Comp className={cn("text-h3", className)} {...props} />
}

export function Body1({ as: Comp = "p", className, ...props }: TypoProps) {
  return <Comp className={cn("text-body-1", className)} {...props} />
}

export function Body2({ as: Comp = "p", className, ...props }: TypoProps) {
  return <Comp className={cn("text-body-2", className)} {...props} />
}

export function Body3({ as: Comp = "p", className, ...props }: TypoProps) {
  return <Comp className={cn("text-body-3", className)} {...props} />
}
