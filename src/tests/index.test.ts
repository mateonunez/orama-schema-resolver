import resolveSchema from ".."
import {test} from "tap"

test("resolve", async ({test}) => {
  test("should resolve", async ({same}) => {
    same(resolveSchema({}), {name: "string"})
  })
})
