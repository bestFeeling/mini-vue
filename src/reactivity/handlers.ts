
import { isObject } from "../shared/index";
import { track, trigger } from "./effect";
import { ReacitveFalgs, reactive, readonly } from "./reactive";


const get = createGet()
const set = createSet()

const readonlyGet = createGet(true)
const readonlySet = createSet(true)

const shallowReadonlyGet = createGet(true, true)

export function createGet(isReadonly = false, shallow = false) {
  return function (target, key) {
    const res = Reflect.get(target, key)

    if (key === ReacitveFalgs.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReacitveFalgs.IS_READONLY) {
      return isReadonly
    }

    if (shallow) return res

    // Note
    // 实现子Object嵌套的逻辑非常巧妙，是在get的时候对这个才对这个结果进行reactive
    // 这样没有被访问到的子object就不会reactive 而且 也不会造成过多的reative
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
      console.warn(`readonly can not set -> (${key} , ${value})`)
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

export const shallowReadonlyHandler = {
  set: readonlySet,
  get: shallowReadonlyGet
}