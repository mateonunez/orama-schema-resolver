/* eslint-disable @typescript-eslint/no-explicit-any */
import type {ResolveSchemaOptions} from "./types/resolve-schema"
import type {PropertiesSchema} from "@lyrasearch/lyra/dist/types"
import type {ResolveSchema} from "@lyrasearch/lyra/dist/types"

function computeGreatestElementIdx(arr: any[]): number {
  let maxIdx = -1
  let maxSize = -Infinity
  for (let i = 0; i < arr.length; i++) {
    const size = Object.values(arr[i]).length
    if (size > maxSize) {
      maxSize = size
      maxIdx = i
    }
  }
  return maxIdx
}

export default function resolveSchema<S extends PropertiesSchema>(data: any, options?: ResolveSchemaOptions): S & {[key: string]: ResolveSchema<typeof data>} {
  const strict = options?.strict ?? true
  const schema: any = {}

  if (Array.isArray(data) && strict) {
    const greatestElementIdx = computeGreatestElementIdx(data)
    return resolveSchema(data[greatestElementIdx], options)
  }

  for (const [key, value] of Object.entries(data)) {
    if (!strict) {
      schema[key] = "string"
      continue
    }

    if (typeof value === "string") {
      schema[key] = "string"
    } else if (typeof value === "number") {
      schema[key] = "number"
    } else if (typeof value === "boolean") {
      schema[key] = "boolean"
    } else if (Array.isArray(value)) {
      if (!schema[key]) {
        schema[key] = []
        schema[key].push(resolveSchema(value, options))
      }
    } else if (typeof value === "object") {
      schema[key] = resolveSchema(value, options)
    } else {
      continue
    }
  }

  return schema
}
