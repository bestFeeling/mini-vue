import { track, trigger } from "./effect";
import { baseHandler, createGet, createSet, readonlyHandler, shallowReadonlyHandler } from "./handlers";

export const enum ReacitveFalgs {
  IS_REACTIVE = '__v_is_reactive',
  IS_READONLY = '__v_is_readonly'
}

export function reactive(raw: any) {
  return generateHandler(raw, baseHandler)
}

export function readonly(row: any) {
  return generateHandler(row, readonlyHandler)
}

export function shallowReadonly(row) {
  return generateHandler(row, shallowReadonlyHandler)
}

export function isReactive(value) {
  return !!value[ReacitveFalgs.IS_REACTIVE]
}

export function isReadonly(value) {
  return !!value[ReacitveFalgs.IS_READONLY]
}

const generateHandler = (raw: any, handler: any) => {
  return new Proxy(raw, handler)
}