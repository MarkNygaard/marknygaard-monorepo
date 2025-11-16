"use client"

import { motion, useScroll } from "framer-motion"

export default function ProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <>
      <div className="absolute top-2 left-0 h-4 w-full bg-secondary text-center" />
      <motion.div
        className="absolute top-2 left-0 z-50 h-4 w-full origin-left bg-primary/80 dark:bg-secondary-foreground"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  )
}
