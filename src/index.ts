/* eslint-disable @typescript-eslint/no-explicit-any */

import {PropertiesSchema} from "@lyrasearch/lyra"
import {ResolveSchema} from "@lyrasearch/lyra/dist/cjs/src/types"
import type {ResolveSchemaOptions} from "./types/resolve-schema"

function computeGreatestElementIdx(arr: any[]): number {
  const sizes = arr.map(el => Object.values(el).length)
  const greatesElement = sizes.reduce((max, v) => (max >= v ? max : v), -Infinity)
  return sizes.indexOf(greatesElement)
}

export default function resolveSchema<S extends PropertiesSchema>(data: any, options?: ResolveSchemaOptions): S & {[key: string]: ResolveSchema<typeof data>} {
  const strict = options?.strict ?? true
  const schema: any = {}

  if (Array.isArray(data)) {
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
      throw new Error(`Unsupported type ${typeof value}`)
    }
  }

  return schema
}
