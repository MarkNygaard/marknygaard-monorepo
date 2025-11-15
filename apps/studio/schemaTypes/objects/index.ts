import { pageBuilder } from "./pageBuilder";
import { pageBuilderBlocks } from "./blocks";
import { og } from "./og";
import { richText } from "./richText";
import { seo } from "./seo";

export const objects = [
	og,
	seo,
	richText,
  pageBuilder,
	...pageBuilderBlocks,
];
