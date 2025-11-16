import { CogIcon, FileText, HomeIcon, Layers, PanelTop, User } from "lucide-react"
import type { StructureBuilder } from "sanity/structure"
import { apiVersion } from "../lib/api"
import { createSingleTon } from "./createSingleton"

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      createSingleTon({ S, type: "homePage", icon: HomeIcon }),
      S.divider(),
      S.listItem()
        .title("Posts")
        .icon(FileText)
        .child(
          S.documentList()
            .title("Posts")
            .filter('_type == "post"')
            .apiVersion(apiVersion)
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Landing Pages")
        .icon(Layers)
        .child(
          S.documentList()
            .title("Landing Pages")
            .filter('_type == "page"')
            .apiVersion(apiVersion)
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Authors")
        .icon(User)
        .child(
          S.documentList()
            .title("Authors")
            .filter('_type == "author"')
            .apiVersion(apiVersion)
            .defaultOrdering([{ field: "name", direction: "asc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Sources & Settings")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Sources & Settings")
            .items([
              createSingleTon({ S, type: "header", icon: PanelTop }),
              createSingleTon({ S, type: "footer", icon: PanelTop }),
            ]),
        ),
    ])
