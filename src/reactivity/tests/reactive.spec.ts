import { isReactive, isReadonly, reactive, readonly } from "../reactive"

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

    const readonlyObj = readonly({age :10});
    expect(isReactive(readonlyObj)).toBe(false)

    expect(isReadonly(readonlyObj)).toBe(true)
  })
})