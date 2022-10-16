/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {ResolveSchema} from "@lyrasearch/lyra/dist/cjs/src/types"
import {reservedPropertyNames} from "@lyrasearch/lyra/dist/cjs/src/utils"

type Schema<S> = {
  [K in keyof S]: S[K] extends S ? Schema<S[K]> : S[K]
}

export default function resolveSchema<S extends ResolveSchema<any>>(data: S): Schema<S> {
  const schema: any = {}

  for (const [key, value] of Object.entries(data)) {
    if (reservedPropertyNames.includes(key)) continue

    if (typeof value === "string") {
      schema[key] = "string"
    } else if (typeof value === "number") {
      schema[key] = "number"
    } else if (typeof value === "boolean") {
      schema[key] = "boolean"
    }
  }

  return schema
}
