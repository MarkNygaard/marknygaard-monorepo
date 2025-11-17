import type {
  BlockComponentProps,
  PageBuilderBlockTypes,
} from "../../features/page-builder/types/pagebuilder"
import { RichTextBlock } from "./RichTextBlock"
import { TextImageBlock } from "./TextImageBlock"

type BlockComponent = React.ComponentType<BlockComponentProps<PageBuilderBlockTypes>>

export const BLOCK_COMPONENTS = {
  richTextBlock: RichTextBlock,
  textImageBlock: TextImageBlock,
} as const satisfies Record<PageBuilderBlockTypes, BlockComponent>

export const BLOCK_COMPONENTS_CLIENT = {
  ...BLOCK_COMPONENTS,
} as const satisfies Record<PageBuilderBlockTypes, BlockComponent>
