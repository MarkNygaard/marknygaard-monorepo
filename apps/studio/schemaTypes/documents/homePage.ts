
import { HomeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
import { GROUPS, GROUP } from "../../utils/constant";

export const homePage = defineType({
	name: "homePage",
	title: "Home Page",
	type: "document",
	icon: HomeIcon,
	groups: GROUPS,
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: (Rule) => Rule.required().error("Title is required for navigation and SEO"),
			group: GROUP.MAIN_CONTENT,
		}),
		defineField({
			name: "pageBuilder",
			title: "Page Content",
			type: "pageBuilder",
			description: "Build your page content using flexible content blocks",
			group: GROUP.MAIN_CONTENT,
		}),
		defineField({
			name: "seo",
			title: "Search Engine Optimization",
			type: "seo",
			group: GROUP.SEO,
		}),
		defineField({
			name: "og",
			title: "Open Graph",
			type: "og",
			group: GROUP.OG,
		}),
	],
	preview: {
		select: {
			title: "title",
			slug: "slug.current",
		},
		prepare({ title, slug }) {
			const subtitle = `/${slug || "no-slug"}`;

			return {
				title,
				subtitle,
			};
		},
	},
});
