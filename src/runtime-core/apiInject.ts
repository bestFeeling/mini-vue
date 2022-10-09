import { getCurrentInstance } from "./component";

export function provide(key, val) {
  const currentInstance = getCurrentInstance()
  if (currentInstance) {
    let { provides } = currentInstance
    const parentProvides = currentInstance.parent.provides
    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides)
    }

    provides[key] = val
  }
}

export function inject(key) {
  const currentInstance = getCurrentInstance()
  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides
    return parentProvides[key]
  }
  return null
}