import { createRender } from '../runtime-core'

function createElement(type) {
  return document.createElement(type)
}
function patchProps(el, key, val) {
  const isOn = /^on[A-Z]/.test(key)
  if (isOn) {
    const event = key.slice(2).toLocaleLowerCase()
    el.addEventListener(event, val)
  } else {
    el.setAttribute(key, val)
  }
}
function insert(container, el) {
  container.append(el)
}

const render: any = createRender(
  {
    createElement,
    patchProps,
    insert
  }
)
export function createApp(...arg) {
  return render.createApp(...arg)
}

export * from '../runtime-core/index'