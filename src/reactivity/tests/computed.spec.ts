import { computed } from "../computed"
import { reactive } from "../reactive"

describe('computed', () => {
  it('basic use', () => {
    let obj = reactive({ age: 1 })
    const age = computed(() => {
      return obj.age
    })

    expect(age.value).toBe(1)
  })

  it('lazy', () => {
    let obj = reactive({ age: 1 })
    let getter = jest.fn(() => {
      return obj.age
    })
    const age = computed(getter)
    expect(getter).not.toBeCalled()

    expect(age.value).toBe(1)
    expect(getter).toBeCalledTimes(1)

    age.value
    expect(getter).toBeCalledTimes(1)

    obj.age = 2
    expect(getter).toBeCalledTimes(1)
    expect(age.value).toBe(2)
    expect(getter).toBeCalledTimes(2)

    age.value
    expect(getter).toBeCalledTimes(2)
  })
})