import { effect } from "../effect"
import { ref } from "../ref"

describe('ref', () => {

  it('basic use', () => {
    const warp = ref(1)

    expect(warp.value).toBe(1)
  })

  it('ref reactive', () => {
    let cnt = 0
    let warp = ref(1)
    let dummy
    effect(() => {
      cnt++
      dummy = warp.value
    })
    expect(cnt).toBe(1)
    expect(dummy).toBe(1)
    warp.value++
    expect(cnt).toBe(2)
    expect(dummy).toBe(2)
    expect(warp.value).toBe(2)
    warp.value = 2
    expect(cnt).toBe(2)
    expect(dummy).toBe(2)
  })

  it('ref obj', () => {
    let cnt = 0
    let warp = ref({ age: 10 })
    let dummy
    effect(() => {
      cnt++
      dummy = warp.value.age
    })
    expect(cnt).toBe(1)
    expect(dummy).toBe(10)
    warp.value.age++
    expect(cnt).toBe(2)
    expect(dummy).toBe(11)
    expect(warp.value.age).toBe(11)
    warp.value.age = 12
    expect(dummy).toBe(12)

    warp.value = { age: 40 }
    warp.value.age = 41
    expect(dummy).toBe(41)

  })
})