
class Effection {
  fn: any
  options: effectOption | undefined

  constructor(fn: Function, options?: effectOption) {
    this.fn = fn
    this.options = options
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
    if (eff.options && eff.options.scheduler) {
      eff.options.scheduler()
    } else {
      eff.run(true)
    }
  }
}

let activeEffect: Effection

type effectOption = {
  scheduler: Function
}
export function effect(fn: Function, options?: effectOption) {
  let effect = new Effection(fn, options)
  effect.run()
  return effect.run.bind(effect)
}