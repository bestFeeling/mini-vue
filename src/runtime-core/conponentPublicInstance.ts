import { hasOwn } from "../shared/index"

const publicPropertyMap = {
  $el: (i) => i.vnode.el
}

export const PublicInstanceProxyHanlders = {
  get: function ({ _: instance }, key) {
    const { setupState, props } = instance
    if (hasOwn(setupState, key)) {
      return setupState[key]
    } else if (hasOwn(props, key)) {
      return props[key]
    }
    const publicGetter = publicPropertyMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }
  }
}