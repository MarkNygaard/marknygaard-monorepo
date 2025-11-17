import type { PageBuilderBlockTypes } from "../../features/page-builder/types/pagebuilder"
import { BlogOverviewBlock } from "./BlogOverviewBlock"
import { FeaturedPostsBlock } from "./FeaturedPostsBlock"
import { RichTextBlock } from "./RichTextBlock"
import { TextImageBlock } from "./TextImageBlock"

export const BLOCK_COMPONENTS = {
  richTextBlock: RichTextBlock,
  textImageBlock: TextImageBlock,
  featuredPostsBlock: FeaturedPostsBlock,
  blogOverviewBlock: BlogOverviewBlock,
} as const satisfies Record<PageBuilderBlockTypes, React.ComponentType<any>>

export const BLOCK_COMPONENTS_CLIENT = {
  ...BLOCK_COMPONENTS,
} as const satisfies Record<PageBuilderBlockTypes, React.ComponentType<any>>

export { BlogOverviewBlock } from "./BlogOverviewBlock"
