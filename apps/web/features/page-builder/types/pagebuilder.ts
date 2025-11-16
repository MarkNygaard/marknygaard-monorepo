import type { HOMEPAGE_QUERYResult, PAGE_QUERYResult } from "@/types/sanity"

type Pages = NonNullable<HOMEPAGE_QUERYResult> | NonNullable<PAGE_QUERYResult>

// Use the PageBuilder type directly from Sanity schema
export type PageBuilderBlockTypes = NonNullable<Pages["pageBuilder"]>[number]["_type"]

// Helper to get a specific block type with all its properties
export type PagebuilderType<T extends PageBuilderBlockTypes> = Extract<
  NonNullable<Pages["pageBuilder"]>[number],
  { _type: T }
>

// Type for a single block
export type PageBuilderBlock = NonNullable<Pages["pageBuilder"]>[number]

// Extended type that includes page builder orchestration props for block components
export type BlockComponentProps<T extends PageBuilderBlockTypes> = PagebuilderType<T> & {
  index?: number
}

export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never

// Utility type to make specific fields optional in a block type
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
