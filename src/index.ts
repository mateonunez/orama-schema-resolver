/* eslint-disable @typescript-eslint/no-explicit-any */

import {PropertiesSchema} from "@lyrasearch/lyra"
import {ResolveSchema} from "@lyrasearch/lyra/dist/cjs/src/types"
import {reservedPropertyNames} from "@lyrasearch/lyra/dist/cjs/src/utils"

export default function resolveSchema<S extends ResolveSchema<any>>(data: S): PropertiesSchema {
  const schema: any = {}

  for (const [key, value] of Object.entries(data)) {
    if (reservedPropertyNames.includes(key)) continue

    if (typeof value === "string") {
      schema[key] = "string"
    } else if (typeof value === "number") {
      schema[key] = "number"
    } else if (typeof value === "boolean") {
      schema[key] = "boolean"
    } else if (typeof value === "object") {
      schema[key] = resolveSchema(value)
    }
  }

  return schema
}
