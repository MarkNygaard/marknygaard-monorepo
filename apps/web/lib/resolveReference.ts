import type { AllSanitySchemaTypes, internalGroqTypeReferenceTo } from "@/types/sanity"

export type ResolveReference<T> = Extract<AllSanitySchemaTypes, { _type: T }>

export type ResolveReferences<T> = {
  [K in keyof T]: T[K] extends { _type: "reference"; [internalGroqTypeReferenceTo]?: infer U }
    ? ResolveReference<U>
    : T[K] extends { _type: "reference"; [internalGroqTypeReferenceTo]?: infer U } | undefined
      ? Partial<ResolveReference<U>> | null
      : T[K]
}

export function resolveReference<T>(obj: {
  _type: "reference"
  [internalGroqTypeReferenceTo]?: T
}) {
  if (obj._type === "reference") throw new Error("Asset reference has not been expanded!")
  return obj as unknown as Extract<AllSanitySchemaTypes, { _type: T }>
}
