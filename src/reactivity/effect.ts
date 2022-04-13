
class Effection {
  fn: any
  options: effectOption | undefined
  deps: any[] = []

  constructor(fn: Function, options?: effectOption) {
    this.fn = fn
    this.options = options
  }

  run() {
    activeEffect = this
    let res = this.fn()
    activeEffect = undefined as any;
    return res
  }

  stop() {
    this.deps.forEach(sets => sets.delete(this))
    if (this.options && this.options.onStop) {
      this.options.onStop()
    }
  }
}
let depsMap = new Map()

export function track(target: any, key: any) {
  let deps = depsMap.get(target)
  if (!deps) depsMap.set(target, deps = new Map())

  let dep = deps.get(key)
  if (!dep) deps.set(key, dep = new Set())

  if (dep.has(activeEffect)) return
  if (activeEffect) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export function trigger(target: any, key: any) {
  let tartgetMap = depsMap.get(target);
  if (tartgetMap) {
    let effects = tartgetMap.get(key)
    for (const eff of effects) {
      if (eff.options && eff.options.scheduler) {
        eff.options.scheduler()
      } else {
        eff.run()
      }
    }
  }
}

let activeEffect: Effection

type effectOption = {
  onStop?: Function,
  scheduler?: Function
}
export function effect(fn: Function, options?: effectOption) {
  let effect = new Effection(fn, options)
  effect.run()
  const runner: any = effect.run.bind(effect)
  runner._effect = effect
  return runner
}

export function stop(runner: any) {
  runner._effect.stop()
}

// note
/* 
  1. 传入effect中的fn会立马执行，这样就会触发fn中代码所有使用到的变量的getter
  2. 同时一个全局的Effection产生，所有fn中的变量都可以根据变量和key来找到应对的这个Effection(内置的depsMap)，
  3. 不仅仅是变量可以找到effect, 所有effect的deps数组也维护着这些变量，可以双向查找
  4. activeEffect.deps的长度表示有多少个不同的变量的effect指向activeEffect,activeEffect.deps[i]表示这些变量的其他effect

  const obj = reactive({ a: 1, b: 1, c: 1 })
  effect(() => {
    dummy = obj.a + obj.b + obj.c
  })
  effect(() => {
    part = obj.a + obj.c
  })
  5.1 从执行顺序上来看，第一个effect方法调用后当前activeEffect.deps.length为3，并且activeEffect.deps[i].length全部都等于1
  5.2 第二个effect方法调用后当前activeEffect.deps[i].length全部都等于2，并且第一个activeEffect.deps也会发生改变，
  5.3 效果是activeEffect.deps[0].length == activeEffect.deps[2].length == 2， activeEffect.deps[1].length == 1
*/