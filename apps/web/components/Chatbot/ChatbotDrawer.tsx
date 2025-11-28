"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { MessageCircle, X } from "lucide-react"
import { useState } from "react"
import { Chatbot } from "./Chatbot"

export function ChatbotDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="absolute right-6 bottom-6 size-14 cursor-pointer rounded-xl border border-border bg-muted shadow-md hover:bg-primary/40"
          size="icon-lg"
          aria-label="Open chat"
        >
          <MessageCircle className="size-6 dark:text-white" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full border-gray-500 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle>Marvin The Awesome AI Bot</DrawerTitle>
          <DrawerDescription className="hidden">
            Chat with an AI assistant to get help and answers
          </DrawerDescription>
          <DrawerClose asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Close chat"
              className="border-gray-300 dark:border-zinc-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex h-[calc(100%-5rem)] flex-col">
          <Chatbot />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
