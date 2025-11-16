import type {
  BlockComponentProps,
  PageBuilderBlockTypes,
} from "../../features/page-builder/types/pagebuilder"
import { RichTextBlock } from "./RichTextBlock"

type BlockComponent = React.ComponentType<BlockComponentProps<PageBuilderBlockTypes>>

export const BLOCK_COMPONENTS = {
  richTextBlock: RichTextBlock,
} as const satisfies Record<PageBuilderBlockTypes, BlockComponent>

export const BLOCK_COMPONENTS_CLIENT = {
  ...BLOCK_COMPONENTS,
} as const satisfies Record<PageBuilderBlockTypes, BlockComponent>
