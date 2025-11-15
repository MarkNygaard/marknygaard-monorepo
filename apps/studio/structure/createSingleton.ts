import { File, LucideIcon } from "lucide-react";
import { SchemaType, SingletonType } from "../schemaTypes";
import { splitCamelCase } from "@workspace/common/splitCamelCase";
import { StructureBuilder } from "sanity/structure";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

export const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? splitCamelCase(type);

  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(S.document().schemaType(type).documentId(type));
};