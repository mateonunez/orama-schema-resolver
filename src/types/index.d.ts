export type ResolveSchemaOptions = {
  strict?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Data = Record<string, any>

export type ResolvedSchema<T extends Data> = {
  [K in keyof T]: ResolvedSchema<T[K]> | "string" | "number" | "boolean" | "array" | "object"
}
