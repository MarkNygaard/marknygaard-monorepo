import { Slot } from "@radix-ui/react-slot"
import { cn } from "@workspace/common/cn"
import { cva, type VariantProps } from "class-variance-authority"
import type React from "react"

const typeVariants = cva("", {
  variants: {
    variant: {
      "heading-xlarge": "text-3xl font-medium leading-7 tracking-tight lg:text-4xl lg:leading-9",
      "heading-large": "text-2xl font-light leading-7 tracking-tight lg:text-3xl lg:leading-9",
      heading: "text-lg font-light leading-normal lg:text-xl lg:leading-tight",
      "heading-small": "text-base font-light leading-snug tracking-[-0.48px]",
      "body-large": "text-base font-light leading-snug tracking-[-.32px]",
      body: "leading-4.5 text-sm font-light",
      "body-small": "text-xs font-light leading-tight",
      "input-small": "leading-3.5 text-black-65 text-[10px] font-light",
      caption: "text-xs font-medium uppercase leading-tight tracking-[0.44px]",
      quote: "leading-6.5 text-xl font-light lg:text-3xl lg:leading-9",
    },
    font: {
      serif: "font-serif",
      sans: "font-sans",
    },
  },
  defaultVariants: {
    variant: "body",
  },
  compoundVariants: [
    {
      variant: "heading-large",
      font: "serif",
      className: "tracking-[-0.96px]",
    },
    {
      variant: "heading-large",
      font: "sans",
      className: "tracking-[-1.28px]",
    },
  ],
})

export interface TypographyProps
  extends React.ComponentProps<"p">,
    VariantProps<typeof typeVariants> {
  asChild?: boolean
}

export function Typography({ variant, className, font, asChild, ...rest }: TypographyProps) {
  const Comp = asChild ? Slot : "p"
  return <Comp className={cn(typeVariants({ variant, font, className }))} {...rest} />
}
