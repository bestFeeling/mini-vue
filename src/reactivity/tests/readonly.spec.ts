import { isReadonly, readonly, shallowReadonly } from "../reactive"

describe('readonly', () => {
  it('basic use', () => {
    const origin = { age: 10, name: `nowell` }
    const waraped = readonly(origin)

    expect(origin).not.toBe(waraped)
    expect(waraped.age).toBe(10)
  })

  it('warn then call set', () => {
    console.warn = jest.fn()
    const origin = { age: 10, name: `nowell` }
    const waraped = readonly(origin)

    waraped.age = 11
    expect(console.warn).toBeCalled()
    expect(waraped.age).toBe(10)

  })

  it('shallowReadonly', () => {
    const nestest = {
      name: { first: 'yang' },
      age: [{ 2022: 29 }]
    }
    const wrap = shallowReadonly(nestest)
    expect(isReadonly(wrap)).toBe(true)
    expect(isReadonly(wrap.name)).toBe(false)
  })
})