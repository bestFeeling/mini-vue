const publicPropertyMap = {
  $el: (i) => i.vnode.el
}

export const PublicInstanceProxyHanlders = {
  get: function ({ _: instance }, key) {
    const { setupState } = instance
    if (key in setupState) {
      return setupState[key]
    }
    const publicGetter = publicPropertyMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }
  }
}