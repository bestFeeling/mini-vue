import { reactive } from "../reactive"

describe('reactive', () => {
  it('basic use', () => {
    const obj = { name: 'nowell' }
    const copy = reactive(obj)

    expect(copy).not.toBe(obj)
    expect(copy.name).toBe('nowell')
  })
})