import resolveSchema from ".."
import {test} from "tap"

test("resolve", ({test, plan}) => {
  plan(6)

  test("should resolve a simple schema using primitives", async ({same}) => {
    const data = {name: "Lyra", stars: 5000, is_forked: true}
    const schema = {name: "string", stars: "number", is_forked: "boolean"}

    same(resolveSchema(data), schema)
  })

  test("shouln't resolve the reserved properties", async ({same}) => {
    const data = {id: "123", name: "Lyra", stars: 5000, is_forked: true}
    const schema = {id: "string", name: "string", stars: "number", is_forked: "boolean"}

    same(resolveSchema(data), schema)
  })

  test("should resolve a nested schema", async ({same}) => {
    const data = {
      name: "Lyra",
      stars: 5000,
      is_forked: true,
      owner: {
        name: "Michele Riva",
        age: 27,
        is_active: true
      }
    }
    const schema = {
      name: "string",
      stars: "number",
      is_forked: "boolean",
      owner: {
        name: "string",
        age: "number",
        is_active: "boolean"
      }
    }

    same(resolveSchema(data), schema)
  })

  test("should resolve multiple nested schemas", async ({same}) => {
    const data = {
      name: "Lyra",
      stars: 5000,
      is_forked: true,
      owner: {
        name: "Michele Riva",
        age: 27,
        is_active: true
      },
      sponsor: {
        name: "NearForm",
        website: "https://nearform.com"
      }
    }

    const schema = {
      name: "string",
      stars: "number",
      is_forked: "boolean",
      owner: {
        name: "string",
        age: "number",
        is_active: "boolean"
      },
      sponsor: {
        name: "string",
        website: "string"
      }
    }

    same(resolveSchema(data), schema)
  })

  test("should resolve a schema with arrays", async ({same}) => {
    const data = {
      name: "Lyra",
      stars: 5000,
      is_forked: true,
      owner: {
        name: "Michele Riva",
        age: 27,
        is_active: true
      },
      sponsor: {
        name: "NearForm",
        website: "https://nearform.com"
      },
      contributors: [
        {
          name: "Paolo Insogna",
          age: 30,
          is_active: true
        },
        {
          name: "Mateo Nunez",
          age: 27,
          is_active: true
        }
      ]
    }

    const schema = {
      name: "string",
      stars: "number",
      is_forked: "boolean",
      owner: {
        name: "string",
        age: "number",
        is_active: "boolean"
      },
      sponsor: {
        name: "string",
        website: "string"
      },
      contributors: [
        {
          name: "string",
          age: "number",
          is_active: "boolean"
        }
      ]
    }

    same(resolveSchema(data), schema)
  })

  test("should throw an error if the data contains an unsupported type", async ({throws}) => {
    const data = {
      name: "Lyra",
      stars: 5000,
      is_forked: true,
      unsupported: () => ({})
    }

    throws(() => resolveSchema(data), `Unsupported type ${typeof data.unsupported}`)
  })
})
