import { PanelTop } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const footer = defineType({
	name: "footer",
	title: "Footer",
	type: "document",
	icon: PanelTop,
	fields: [
		defineField({
			name: "links",
			type: "array",
			title: "Social Links",
			validation: (rule) => rule.required().min(1).error("At least one link is required"),
			description: "The list of links to display in this column",
			of: [
        defineField({
          name: "socialLink",
          type: "socialLink",			
        }),
      ],
		}),
    defineField({
      name: "copyrightText",
      type: "string",
      title: "Copyright Text",
      description: "The copyright text to display in the footer",
      validation: (rule) => rule.required().error("Copyright text is required"),
    }),
	],
  preview: {
		prepare() {
			return {
				title: "Footer",
			};
		},
	},
});
