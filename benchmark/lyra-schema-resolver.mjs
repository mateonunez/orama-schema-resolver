import cronometro from "cronometro"
import ResolveSchema from "../dist/cjs/index.js"
import events from "./dataset/events.mjs"

const {default: resolveSchema} = ResolveSchema

const cronometroOptions = {
  iterations: 30_000
}

const eventsSlice = events.slice(0, 10_000)

cronometro(
  {
    "10_000 events": () => {
      resolveSchema(eventsSlice)
    }
  },
  cronometroOptions
)

cronometro(
  {
    "all events": () => {
      resolveSchema(events)
    }
  },
  cronometroOptions
)
