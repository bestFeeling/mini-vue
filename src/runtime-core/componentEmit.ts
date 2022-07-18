import { camelize, toHanlderKey } from "../shared/index"

export const emit = (instance, event, ...arg) => {
  const { props } = instance

  const handlerKey = toHanlderKey(camelize(event))

  // TPP 
  // 先写一个特定的行为，然后再改成通用的行为

  const handler = props[handlerKey]
  handler && handler(...arg)

}