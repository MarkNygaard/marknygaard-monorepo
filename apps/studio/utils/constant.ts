import { BlockElementIcon, ComposeIcon, InlineElementIcon, InsertAboveIcon, SearchIcon } from "@sanity/icons";
import type { FieldGroupDefinition } from "sanity";

export const GROUP = {
	SEO: "global-seo",
	MAIN_CONTENT: "main-content",
	CARD: "card",
	SETTINGS: "settings",
	OG: "og",
};

export const GROUPS: FieldGroupDefinition[] = [
	{
		name: GROUP.MAIN_CONTENT,
		icon: ComposeIcon,
		title: "Content",
		default: true,
	},
	{ name: GROUP.SEO, icon: SearchIcon, title: "SEO" },
	{
		name: GROUP.OG,
		icon: InsertAboveIcon,
		title: "Open Graph",
	},
	{
		name: GROUP.CARD,
		icon: BlockElementIcon,
		title: "Card",
	},
	{
		name: GROUP.SETTINGS,
		icon: InlineElementIcon,
		title: "Settings",
	},
];
