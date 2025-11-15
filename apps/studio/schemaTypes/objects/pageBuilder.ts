
import { LayoutDashboard } from "lucide-react";
import { defineArrayMember, defineType } from "sanity";
import { pageBuilderBlocks } from "./blocks";

export const pageBuilderBlockTypes = pageBuilderBlocks.map(({ name }) => ({
	type: name,
}));

const generalBlockTypes = pageBuilderBlocks
	.filter(({ name }) =>
		[
			"richTextBlock",

		].includes(name)
	)
	.map(({ name }) => ({
		type: name,
	}));

export const pageBuilder = defineType({
	name: "pageBuilder",
	title: "Page Builder",
	type: "array",
	icon: LayoutDashboard,
	description: "Build your page content using flexible, reusable blocks",
	of: generalBlockTypes.map((block) => defineArrayMember(block)),
	options: {
		insertMenu: {
			views: [
				{ name: "grid", previewImageUrl: (schemaTypeName) => `/static/preview-${schemaTypeName}.jpg` },
				{ name: "list" },
			],
		},
	},
});