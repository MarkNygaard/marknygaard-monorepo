"use client"

import { Ticket0Chat } from "@ticket0-ai/widget"

interface Ticket0ChatWidgetProps {
  workspaceId: string
}

export function Ticket0ChatWidget({ workspaceId }: Ticket0ChatWidgetProps) {
  return <Ticket0Chat workspaceId={workspaceId} />
}
