import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge tuned for the BCP design tokens. Without this, custom
 * utilities like `text-h1` (font bundle) and `text-on-text` (color) get
 * mistaken for the same `text-*` family and one is dropped on merge.
 *
 * - Typography classes are registered as `font-size`.
 * - Semantic/BCP colors are registered as `text-color`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h2",
            "h3",
            "body-1",
            "body-2",
            "body-3",
            "interactive-md",
            "interactive-lg",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "on-text",
            "label",
            "brand",
            "bcp-blue",
            "foreground",
            "muted-foreground",
            "primary",
            "primary-foreground",
            "secondary-foreground",
            "accent-foreground",
            "card-foreground",
            "popover-foreground",
            "destructive",
            "destructive-foreground",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
