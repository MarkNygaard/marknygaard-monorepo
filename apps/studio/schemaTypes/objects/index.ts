import { pageBuilder } from "./pageBuilder";
import { pageBuilderBlocks } from "./blocks";
import { og } from "./og";
import { richText } from "./richText";
import { seo } from "./seo";
import { link } from "./link";
import { socialLink } from "./socialLink";

export const objects = [
  link,
  socialLink,
	og,
	seo,
	richText,
  pageBuilder,
	...pageBuilderBlocks,
];
