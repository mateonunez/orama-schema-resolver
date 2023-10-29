import resolveSchema from "../src/index.js"
import {test} from "tap"

test("resolve", ({test, plan}) => {
  plan(7)

  test("should resolve a simple schema using primitives", async ({same}) => {
    const data = {name: "Orama", stars: 5000, is_forked: true}
    const schema = {name: "string", stars: "number", is_forked: "boolean"}

    same(resolveSchema(data), schema)
  })

  test("shouln't resolve the reserved properties", async ({same}) => {
    const data = {id: "123", name: "Orama", stars: 5000, is_forked: true}
    const schema = {id: "string", name: "string", stars: "number", is_forked: "boolean"}

    const resolvedSchema = resolveSchema(data)

    console.log(resolvedSchema.name)

    same(resolveSchema(data), schema)
  })

  test("should resolve a nested schema", async ({same}) => {
    const data = {
      name: "Orama",
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
      name: "Orama",
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
      name: "Orama",
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

  test("should support and skip unsupported types", async ({same}) => {
    const data = {
      name: "Orama",
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
      ],
      unknown: undefined,
      function: () => ({})
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

  test("should resolve a schema with arrays of objects", async ({same}) => {
    const data = [
      {
        name: "Orama",
        stars: 5000,
        is_forked: true,
      },
      {
        name: "orama-schema-resolver",
        stars: 100,
        is_forked: false,
      }
    ]

    const schema = {
      name: "string",
      stars: "number",
      is_forked: "boolean"
    }

    same(resolveSchema(data), schema)
  })
})

test("strict mode", async ({same}) => {
  const data = {
    name: "Orama",
    stars: 5000,
    is_forked: true,
    owner: {
      name: "Michele Riva",
      age: 27
    }
  }

  const schema = {
    name: "string",
    stars: "string",
    is_forked: "string",
    owner: "string"
  }

  same(resolveSchema(data, {strict: false}), schema)
})

test("strict mode with arrays", async ({same}) => {
  const data = [
    {
      name: "Orama",
      stars: 5000,
      is_forked: true,
    },
    {
      name: "orama-schema-resolver",
      stars: 100,
      is_forked: false,
    }
  ]

  const schema = {
    name: "string",
    stars: "string",
    is_forked: "string"
  }

  same(resolveSchema(data, {strict: false}), schema)
})
