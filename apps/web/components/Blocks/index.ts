import type { PageBuilderBlockTypes } from "../../features/page-builder/types/pagebuilder"
import { RichTextBlock } from "./RichTextBlock"

export const BLOCK_COMPONENTS = {
  richTextBlock: RichTextBlock,
  // biome-ignore lint: false positive - RichTextBlock is intentionally included here
} as const satisfies Record<PageBuilderBlockTypes, React.ComponentType<any>>

export const BLOCK_COMPONENTS_CLIENT = {
  ...BLOCK_COMPONENTS,
  // biome-ignore lint: false positive - BLOCK_COMPONENTS is intentionally spread here
} as const satisfies Record<PageBuilderBlockTypes, React.ComponentType<any>>
