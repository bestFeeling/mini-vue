import { effect } from "../effect"
import { reactive } from "../reactive"

describe('effect', () => {
  it('basic use', () => {

    const user = reactive({
      age: 10
    })
    let age
    effect(() => {
      age = user.age++
    })
    expect(age).toBe(11)
    user.age = 20
    expect(age).toBe(20)
  })

})