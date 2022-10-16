import resolveSchema from ".."
import {test} from "tap"

test("resolve", ({test, plan}) => {
  plan(2)

  test("should resolve a simple schema using primitives", async ({same}) => {
    const data = { name: "Lyra", stars: 5000, is_forked: true }
    const schema = { name: "string", stars: "number", is_forked: "boolean" }

    same(resolveSchema(data), schema)
  })

  test("shouln't resolve the reserved properties", async ({same}) => {
    const data = { id: "123", name: "Lyra", stars: 5000, is_forked: true }
    const schema = { name: "string", stars: "number", is_forked: "boolean" }

    same(resolveSchema(data), schema)
  })
})
