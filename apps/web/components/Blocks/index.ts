import type { PageBuilderBlockTypes } from "../../features/page-builder/types/pagebuilder"
import { RichTextBlock } from "./RichTextBlock"

export const BLOCK_COMPONENTS = {
  richTextBlock: RichTextBlock,
} as const satisfies Record<PageBuilderBlockTypes, React.ComponentType<any>>

export const BLOCK_COMPONENTS_CLIENT = {
  ...BLOCK_COMPONENTS,
} as const satisfies Record<PageBuilderBlockTypes, React.ComponentType<any>>
