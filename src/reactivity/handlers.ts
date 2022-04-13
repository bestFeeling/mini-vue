import { isObject } from "../shared";
import { track, trigger } from "./effect";
import { ReacitveFalgs, reactive, readonly } from "./reactive";


const get = createGet()
const set = createSet()

const readonlyGet = createGet(true)
const readonlySet = createSet(true)


export function createGet(isReadonly = false) {
  return function (target, key) {
    const res = Reflect.get(target, key)

    if (key === ReacitveFalgs.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReacitveFalgs.IS_READONLY) {
      return isReadonly
    }

    if (isObject(res)) return isReadonly ? readonly(res) : reactive(res)


    if (!isReadonly) {
      //收集依赖
      track(target, key)
    }
    return res;
  }
}
export function createSet(isReadonly = false) {
  return function (target, key, value) {
    if (isReadonly) {
      console.warn('readonly can not set')
      return true
    }
    const res = Reflect.set(target, key, value)
    //触发effect
    trigger(target, key)
    return res;
  }
}

export const baseHandler = {
  set,
  get,
}

export const readonlyHandler = {
  set: readonlySet,
  get: readonlyGet,
}