export function reactive(raw: any) {

  return new Proxy(raw, {
    get: function (target, key) {
      const res = Reflect.get(target, key)

      return res;
    },
    set: function (target, key, value) {
      const res = Reflect.set(target, key, value)
      return res;
    }
  })
}