import type {ResolveSchemaOptions, Data, ResolvedSchema} from "./types"
import {computeGreatestElementIdx} from "./util/index.js"

export default function resolveSchema<T extends Data>(data: T, options?: ResolveSchemaOptions): ResolvedSchema<T> {
  const strict = options?.strict ?? true
  const schema: Data = {}

  if (Array.isArray(data)) {
    const greatestElementIdx = computeGreatestElementIdx(data)
    return resolveSchema(data[greatestElementIdx], options)
  }

  for (const [key, value] of Object.entries(data)) {
    if (!strict) {
      schema[key] = "string"
      continue
    }

    const typeValue = typeof value
    if (typeValue === "string") {
      schema[key] = "string"
    } else if (typeValue === "number") {
      schema[key] = "number"
    } else if (typeValue === "boolean") {
      schema[key] = "boolean"
    } else if (Array.isArray(value)) {
      if (!schema[key]) {
        schema[key] = []
        schema[key].push(resolveSchema(value, options))
      }
    } else if (typeValue === "object") {
      schema[key] = resolveSchema(value, options)
    } else {
      continue
    }
  }

  return schema as ResolvedSchema<T>
}
