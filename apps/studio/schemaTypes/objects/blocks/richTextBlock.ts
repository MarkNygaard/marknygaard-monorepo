import { FileText } from "lucide-react";
import { defineField, defineType } from "sanity";

export const richTextBlock = defineType({
	name: "richTextBlock",
	title: "Rich Text",
	icon: FileText,
	type: "object",
	description: "A flexible rich text editor with formatting, headings, lists, and images",
	fields: [
		defineField({
			name: "content",
			type: "richText",
			title: "Content",
			description: "Rich text content with formatting options",
			validation: (Rule) => Rule.required().error("Content is required"),
		}),
		defineField({
			name: "blockTitle",
			type: "string",
			title: "Block Title (Internal)",
			description: "Optional title for identifying this block in the editor (not displayed on frontend)",
		}),
	],
	preview: {
		select: {
			content: "content",
			blockTitle: "blockTitle",
		},
		prepare({ content, blockTitle }) {
			const textContent =
				content && content.length > 0
					? content.find((block: any) => block._type === "block" || block._type === "paragraph")
					: null;

			const previewText =
				textContent && textContent.children
					? textContent.children
							.filter((child: any) => child.text)
							.map((child: any) => child.text)
							.join(" ")
							.slice(0, 100) +
						(textContent.children.some((child: any) => child.text && child.text.length > 100) ? "..." : "")
					: "Empty rich text block";

			return {
				title: blockTitle || "Rich Text",
				subtitle: previewText,
			};
		},
	},
});