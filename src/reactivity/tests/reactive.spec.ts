import { isReactive, isReadonly, reactive, readonly, shallowReadonly } from "../reactive"

describe('reactive', () => {
  it('basic use', () => {
    const obj = { name: 'nowell' }
    const copy = reactive(obj)

    expect(copy).not.toBe(obj)
    expect(copy.name).toBe('nowell')
  })

  it('isReacite', () => {
    const obj = reactive({ age: 10 })
    expect(isReactive(obj)).toBe(true)

    const readonlyObj = readonly({ age: 10 });
    expect(isReactive(readonlyObj)).toBe(false)

    expect(isReadonly(readonlyObj)).toBe(true)
  })

  it('nested reactive', () => {
    const origin = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }]
    }
    const observed = reactive(origin)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })

  it('nested readonly', () => {
    const origin = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }]
    }
    const observed = readonly(origin)
    expect(isReadonly(observed.nested)).toBe(true)
    expect(isReadonly(observed.array)).toBe(true)
    expect(isReadonly(observed.array[0])).toBe(true)
  })

  it('shallow Reactive', () => {
    const nestest = {
      name: { first: 'yang' },
      age: [{ 2022: 29 }]
    }
    const wrap = shallowReadonly(nestest)
    expect(isReadonly(wrap)).toBe(true)
    expect(isReadonly(wrap.name)).toBe(false)
  })
})