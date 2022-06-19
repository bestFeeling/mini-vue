import { isReadonly, shallowReadonly } from "../reactive";

describe('shallow readonly', () => {
  it('shallowReadonly', () => {
    const nestest = {
      name: { first: 'yang' },
      age: [{ 2022: 29 }]
    }
    const wrap = shallowReadonly(nestest)
    expect(isReadonly(wrap)).toBe(true)
    expect(isReadonly(wrap.name)).toBe(false)
  })

  it('call warning', () => {
    console.warn = jest.fn()
    const obj = shallowReadonly({
      age: 10
    })
    obj.age = 11
    expect(console.warn).toHaveBeenCalled()
  })
})