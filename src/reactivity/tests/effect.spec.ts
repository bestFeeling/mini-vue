import { effect, stop } from "../effect"
import { reactive } from "../reactive"

describe('effect', () => {

  it('basic use', () => {

    const user = reactive({
      age: 10
    })
    let age
    effect(() => {
      age = user.age + 1;
    })
    expect(age).toBe(11)
    user.age++
    expect(age).toBe(12)

    user.age = 100
    expect(age).toBe(101)
  })

  it('runner', () => {
    let age = 10;
    const runner = effect(() => {
      age++;
      return 'foo'
    })
    expect(age).toBe(11)
    const res = runner()
    expect(age).toBe(12)
    expect(res).toBe('foo')
  })

  it('scheduler', () => {
    let dummy
    let run: any
    const obj = reactive({ foo: 10 })
    const scheduler = jest.fn(() => {
      run = runner
    })

    const runner = effect(() => {
      dummy = obj.foo
    }, { scheduler })

    expect(dummy).toBe(10)
    expect(scheduler).not.toBeCalled()

    obj.foo++
    expect(dummy).toBe(10)
    expect(scheduler).toBeCalledTimes(1)

    run()
    expect(dummy).toBe(11)
  })

  it('seter', () => {
    const obj2 = reactive({ a: 2 })
    obj2.a = '123'
    console.log(obj2.a)
  })

  it('exist effect', () => {
    const obj = reactive({ a: 1, b: 1, c: 1 })
    let dummy
    let fn = jest.fn(() => {
      dummy = obj.a + obj.b + obj.c
    })
    effect(fn)
    expect(dummy).toBe(3)
    expect(fn).toBeCalledTimes(1)
    obj.a = 3;
    expect(fn).toBeCalledTimes(2)

    const obj2 = reactive({ a: 2 })
    // 触发getter 此时全局activeEffect已经存在，于是被记录成obj2.a的effect
    console.log(obj2.a)
    // 触发setter 会导致之前的effect被执行
    obj2.a = 3
    expect(fn).toBeCalledTimes(2)
  })

  it('stop', () => {
    let dummy
    const obj = reactive({ foo: 1 })
    let runner = effect(() => {
      dummy = obj.foo
    })
    obj.foo = 2
    expect(dummy).toBe(2)
    stop(runner)
    obj.foo = 3
    expect(dummy).toBe(2)
    runner()
    expect(dummy).toBe(3)
  })

  it('onStop', () => {
    let dummy
    const obj = reactive({ foo: 1 })
    const onStop = jest.fn(() => {

    })
    let runner = effect(() => {
      dummy = obj.foo
    }, { onStop })
    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})