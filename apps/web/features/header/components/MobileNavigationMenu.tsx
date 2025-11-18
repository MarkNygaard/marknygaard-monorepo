"use client"

import { cn } from "@workspace/common/cn"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { AnimatePresence, motion } from "framer-motion"
import { MenuIcon } from "lucide-react"
import NextLink from "next/link"
import { useState } from "react"
import type { LAYOUT_QUERYResult } from "@/types/sanity"

function NavItem({ href, text, onClose }: { href: string; text: string; onClose: () => void }) {
  return (
    <NextLink
      href={href}
      onClick={onClose}
      className="mx-2 block w-full rounded-lg bg-white py-10 text-center font-semibold text-2xl text-primary-foreground shadow-md dark:bg-muted dark:text-secondary-foreground"
    >
      <span className="capsize">{text}</span>
    </NextLink>
  )
}

type MobileNavigationMenuProps = Partial<
  Pick<NonNullable<LAYOUT_QUERYResult["header"]>, "logo" | "links">
>

export default function MobileNavigationMenu({ links }: MobileNavigationMenuProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <Dialog open={menuIsOpen} onOpenChange={setMenuIsOpen}>
      <DialogTrigger asChild>
        <DialogTrigger asChild>
          <Button
            aria-label="Search"
            variant="ghost"
            size="icon"
            className="h-12 cursor-pointer text-muted-foreground hover:text-primary-foreground dark:text-secondary-foreground/50 dark:hover:text-secondary-foreground"
          >
            <MenuIcon className="size-6" />
          </Button>
        </DialogTrigger>
      </DialogTrigger>
      <AnimatePresence>
        {menuIsOpen && (
          <DialogPortal forceMount>
            <DialogOverlay asChild className="bg-secondary/30 backdrop-blur">
              <motion.div
                key="dialogDialog"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.4,
                    ease: [0.36, 0.66, 0.04, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    ease: [0.36, 0.66, 0.04, 1],
                    delay: 0.15,
                  },
                }}
              ></motion.div>
            </DialogOverlay>
            <DialogContent
              className="max-w-lg border-none bg-white/0 p-4 shadow-none"
              onClick={() => setMenuIsOpen(false)}
              showCloseButton={false}
            >
              <DialogTitle className="hidden">Menu</DialogTitle>
              {links?.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.2,
                      delay: 0.1 * i,
                      type: "spring",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    transition: {
                      duration: 0.1,
                      delay: 0.05 * i,
                      type: "spring",
                    },
                  }}
                  className={cn(
                    links.length <= 3 ? "w-full" : "w-1/2",
                    "mt-6 flex items-center justify-center",
                  )}
                  key={link._key}
                >
                  <NavItem
                    href={link.internalLink?.slug?.current || link.externalLink}
                    text={link.internalLink?.title || link.name}
                    onClose={() => setMenuIsOpen(false)}
                  />
                </motion.div>
              ))}
            </DialogContent>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
