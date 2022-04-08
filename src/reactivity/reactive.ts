import { track, trigger } from "./effect";
import { baseHandler, createGet, createSet, readonlyHandler } from "./handlers";

export function reactive(raw: any) {
  return generateHandler(raw, baseHandler)
}

export function readonly(row: any) {
  return generateHandler(row, readonlyHandler)
}

const generateHandler = (raw: any, handler: any) => {
  return new Proxy(raw, handler)
}