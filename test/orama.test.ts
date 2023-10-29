import resolveSchema from "../src";
import { test } from "tap";
import { create, insert, /* search */ } from "@orama/orama";

test("should create an orama db with a resolved schema", async ({ ok }) => {
  const data = { name: "Orama", stars: 5000, is_forked: true };
  const schema = resolveSchema(data);

  const db = await create({ schema: schema });

  const documentId = await insert(db, data);
  ok(documentId);
})

test("should create an orama db with a resolved schema and a custom id", async ({ ok }) => {
  const data = { name: "Orama", stars: 5000, is_forked: true };
  const schema = resolveSchema(data);

  const db = await create({ schema: schema, id: "custom-id" });

  const documentId = await insert(db, data);
  ok(documentId);
})
