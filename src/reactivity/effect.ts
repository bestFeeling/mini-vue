
class Effection {
  fn: any
  constructor(fn: Function) {
    this.fn = fn
  }

  run() {
    activeEffect = this
    return this.fn()
  }
}
let depsMap = new Map()

export function track(target: any, key: any) {
  let deps = depsMap.get(target)
  if (!deps) depsMap.set(target, deps = new Map())

  let dep = deps.get(key)
  if (!dep) deps.set(key, dep = new Set())

  dep.add(activeEffect)
}

export function trigger(target: any, key: any) {
  let effects = depsMap.get(target).get(key);
  for (const eff of effects) {
    eff.run()
  }
}

let activeEffect: Effection
export function effect(fn: Function) {
  let effect = new Effection(fn)
  effect.run()
  return () => {
    return effect.run()
  }
}