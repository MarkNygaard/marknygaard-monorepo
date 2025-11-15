import { Slot } from "@radix-ui/react-slot"
import { cn } from "@workspace/common/cn"
import { cva, type VariantProps } from "class-variance-authority"
import type React from "react"

const gridVariants = cva("lg:grid-cols-24 lg:grid lg:gap-0.5", {
  variants: {
    padding: {
      true: "lg:px-0.5",
      false: "",
    },
  },
  defaultVariants: { padding: false },
})

function Grid({
  padding,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof gridVariants>) {
  return <div data-slot="grid" className={cn(gridVariants({ padding, className }))} {...props} />
}

const gridItemVariants = cva("", {
  variants: {
    colSpan: {
      "1": "lg:col-span-1",
      "2": "lg:col-span-2",
      "3": "lg:col-span-3",
      "4": "lg:col-span-4",
      "5": "lg:col-span-5",
      "6": "lg:col-span-6",
      "7": "lg:col-span-7",
      "8": "lg:col-span-8",
      "9": "lg:col-span-9",
      "10": "lg:col-span-10",
      "11": "lg:col-span-11",
      "12": "lg:col-span-12",
      "13": "lg:col-span-13",
      "14": "lg:col-span-14",
      "15": "lg:col-span-15",
      "16": "lg:col-span-16",
      "17": "lg:col-span-17",
      "18": "lg:col-span-18",
      "19": "lg:col-span-19",
      "20": "lg:col-span-20",
      "21": "lg:col-span-21",
      "22": "lg:col-span-22",
      "23": "lg:col-span-23",
      "24": "lg:col-span-24",
    },
    colStart: {
      "1": "lg:col-start-1",
      "2": "lg:col-start-2",
      "3": "lg:col-start-3",
      "4": "lg:col-start-4",
      "5": "lg:col-start-5",
      "6": "lg:col-start-6",
      "7": "lg:col-start-7",
      "8": "lg:col-start-8",
      "9": "lg:col-start-9",
      "10": "lg:col-start-10",
      "11": "lg:col-start-11",
      "12": "lg:col-start-12",
      "13": "lg:col-start-13",
      "14": "lg:col-start-14",
      "15": "lg:col-start-15",
      "16": "lg:col-start-16",
      "17": "lg:col-start-17",
      "18": "lg:col-start-18",
      "19": "lg:col-start-19",
      "20": "lg:col-start-20",
      "21": "lg:col-start-21",
      "22": "lg:col-start-22",
      "23": "lg:col-start-23",
      "24": "lg:col-start-24",
      auto: "",
    },
    row: {
      "1": "lg:row-start-1",
      "2": "lg:row-start-2",
    },
  },
  defaultVariants: {
    colSpan: "18",
    colStart: "7",
  },
})

function GridItem({
  className,
  colSpan,
  colStart,
  row,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof gridItemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="grid-content"
      className={cn(gridItemVariants({ colSpan, colStart, row, className }))}
      {...props}
    />
  )
}

export { Grid, GridItem }
