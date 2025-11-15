
import { HomeIcon, Layers } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";
import { createSingleTon } from "./createSingleton";
import { apiVersion } from "../lib/api";


export const structure = (
  S: StructureBuilder,
) =>
  S.list()
    .title("Content")
    .items([
      createSingleTon({ S, type: "homePage", icon: HomeIcon }),
      S.divider(),
      S.listItem()
				.title("Landing Pages")
				.icon(Layers)
				.child(
					S.documentList()
						.title("Landing Pages")
						.filter('_type == "page"')
						.apiVersion(apiVersion)
						.defaultOrdering([{ field: "title", direction: "asc" }])
				),
    ]);
