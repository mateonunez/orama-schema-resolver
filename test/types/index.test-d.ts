import {expectType} from "tsd"

import type {ResolvedSchema} from "../../src/types"
import resolveSchema from "../../src"

const schema = resolveSchema({
  name: "John",
  age: 27,
  is_active: true,
  address: {
    street: "Main Street",
    number: 1,
    is_active: true
  },
  friends: [
    {
      name: "Jane",
      age: 25,
      is_active: true
    },
    {
      name: "Jack",
      age: 30,
      is_active: true
    }
  ]
})

expectType<ResolvedSchema<typeof schema>>(schema)
