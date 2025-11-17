"use client"

import { cn } from "@workspace/common/cn"
import { motion } from "framer-motion"
import type React from "react"

type Props = {
  id?: string
  fadeIn?: boolean
  fadeInDelay?: number
  className?: string
  children: React.ReactNode
}

export default function TextAnimation({ id, fadeIn, fadeInDelay, className, children }: Props) {
  return (
    <motion.article
      id={id}
      initial={fadeIn ? { y: 20, opacity: 0 } : { opacity: 1 }}
      animate={fadeIn ? { y: 0, opacity: 1 } : { opacity: 1 }}
      transition={fadeIn ? { duration: 0.5, delay: fadeInDelay ?? 0 } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.article>
  )
}
