
import { HomeIcon } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";
import { createSingleTon } from "./createSingleton";

export const structure = (
  S: StructureBuilder,
) =>
  S.list()
    .title("Content")
    .items([
      createSingleTon({ S, type: "homePage", icon: HomeIcon }),
    ]);
