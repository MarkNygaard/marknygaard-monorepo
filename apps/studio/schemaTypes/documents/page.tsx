import { GROUP, GROUPS } from "../../utils/constant";
import { Layers2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const page = defineType({
	name: "page",
	title: "Page",
	type: "document",
	icon: Layers2,
	groups: GROUPS,
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: (Rule) => Rule.required().error("Title is required for navigation and SEO"),
			group: GROUP.MAIN_CONTENT,
		}),
		defineField({
			name: "slug",
			type: "slug",
			validation: (Rule) => Rule.required().error("Slug is required for page URLs"),
			options: {
				source: "title",
			},
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
			language: "language",
			_id: "_id",
		},
		prepare({ title, slug }) {
			const subtitle = `/${slug || "no-slug"}`;

			return {
				title: title,
				subtitle,
			};
		},
	},
});
