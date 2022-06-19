import { effect } from "../effect"
import { isRef, proxyRefs, ref, unRef } from "../ref"

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

  it('isRef', () => {
    let age = ref(10)
    expect(isRef(age)).toBe(true)
    expect(isRef(10)).toBe(false)
  })

  it('unRef', () => {
    const obj = { age: 10 }
    let wrap = ref(obj)
    expect(unRef(wrap)).toEqual(obj)

    expect(unRef(ref(10))).toEqual(10)
  })

  it('proxyRefs', () => {
    const user = {
      age: ref(10),
      name: 'yang'
    }
    const proxyUser = proxyRefs(user)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
    expect(proxyUser.name).toBe('yang')

    proxyUser.age = 20
    expect(user.age.value).toBe(20)
    expect(proxyUser.age).toBe(20)

    proxyUser.age = ref(30)
    expect(user.age.value).toBe(30)
    expect(proxyUser.age).toBe(30)
  })
})