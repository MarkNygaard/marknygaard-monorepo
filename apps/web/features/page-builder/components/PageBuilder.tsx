import { draftMode } from "next/headers"
import { BLOCK_COMPONENTS } from "@/components/Blocks"
import type { PageBuilderBlock } from "@/features/page-builder/types/pagebuilder"
import { PageBuilderDraftMode } from "./PageBuilderDraftMode"

interface PageBuilderProps {
  blocks: PageBuilderBlock[]
  documentId: string
  documentType: string
}

/**
 * Error fallback component for unknown block types
 */
function UnknownBlockError({ blockType, blockKey }: { blockType: string; blockKey: string }) {
  return (
    <div
      key={`${blockType}-${blockKey}`}
      className="flex items-center justify-center rounded-lg border-2 border-muted-foreground/20 border-dashed bg-muted p-8 text-center text-muted-foreground"
      role="alert"
      aria-label={`Unknown block type: ${blockType}`}
    >
      <div className="space-y-2">
        <p>Component not found for block type:</p>
        <code className="rounded bg-background px-2 py-1 font-mono text-sm">{blockType}</code>
      </div>
    </div>
  )
}

/**
 * Render a single block component for server-side rendering
 */
function renderBlock(block: PageBuilderBlock, index: number) {
  const Component = BLOCK_COMPONENTS[block._type as keyof typeof BLOCK_COMPONENTS]

  if (!Component) {
    return (
      <UnknownBlockError
        key={`${block._type}-${block._key}`}
        blockType={block._type}
        blockKey={block._key}
      />
    )
  }

  const blockElement = <Component {...(block as any)} index={index} />

  return <div key={`${block._type}-${block._key}`}>{blockElement}</div>
}

/**
 * PageBuilder component for rendering dynamic content blocks from Sanity CMS
 * Uses client-side features only when draft mode is enabled
 */
export async function PageBuilder({ blocks, documentId, documentType }: PageBuilderProps) {
  const { isEnabled: isDraftMode } = await draftMode()

  // Handle empty state
  if (!blocks || blocks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-gray-500">No page builder blocks configured</div>
      </div>
    )
  }

  // Use client component with optimistic updates only in draft mode
  if (isDraftMode) {
    return (
      <PageBuilderDraftMode blocks={blocks} documentId={documentId} documentType={documentType} />
    )
  }

  // Server-side rendering for production
  return <div className="w-full">{blocks.map((block, index) => renderBlock(block, index))}</div>
}
