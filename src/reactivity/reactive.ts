import { track, trigger } from "./effect";

export function reactive(raw: any) {

  return new Proxy(raw, {
    get: function (target, key) {
      const res = Reflect.get(target, key)
      //收集依赖
      track(target, key)
      return res;
    },
    set: function (target, key, value) {
      const res = Reflect.set(target, key, value)
      //触发effect
      trigger(target, key)
      return res;
    }
  })
}