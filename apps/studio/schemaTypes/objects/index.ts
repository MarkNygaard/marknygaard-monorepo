import { pageBuilderBlocks } from "./blocks"
import { link } from "./link"
import { og } from "./og"
import { pageBuilder, postPageBuilder } from "./pageBuilder"
import { richText } from "./richText"
import { seo } from "./seo"
import { socialLink } from "./socialLink"

export const objects = [
  link,
  socialLink,
  og,
  seo,
  richText,
  pageBuilder,
  postPageBuilder,
  ...pageBuilderBlocks,
]
