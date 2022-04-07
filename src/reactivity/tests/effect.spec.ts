import { effect } from "../effect"
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
})