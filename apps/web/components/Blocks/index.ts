import type { PageBuilderBlockTypes } from "../../features/page-builder/types/pagebuilder"
import { BlogOverviewBlock } from "./BlogOverviewBlock"
import { FeaturedPostsBlock } from "./FeaturedPostsBlock"
import { GalleryBlock } from "./GalleryBlock"
import { RichTextBlock } from "./RichTextBlock"
import { TextImageBlock } from "./TextImageBlock"

export const BLOCK_COMPONENTS = {
  richTextBlock: RichTextBlock,
  textImageBlock: TextImageBlock,
  featuredPostsBlock: FeaturedPostsBlock,
  blogOverviewBlock: BlogOverviewBlock,
  galleryBlock: GalleryBlock,
} as const satisfies Record<PageBuilderBlockTypes, React.ComponentType<never>>

export const BLOCK_COMPONENTS_CLIENT = {
  ...BLOCK_COMPONENTS,
} as const satisfies Record<PageBuilderBlockTypes, React.ComponentType<never>>

export { BlogOverviewBlock } from "./BlogOverviewBlock"
