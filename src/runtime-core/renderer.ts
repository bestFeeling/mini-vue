import { isObject } from "../shared/index"
import { ShapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, Text } from "./vnode"

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

function patch(vnode: any, container: any) {
  const { type } = vnode
  switch (type) {
    case Fragment:
      processFragment(vnode, container)
      break;
    case Text:
      processText(vnode, container)
      break;
    default:

      const { shapeFlags } = vnode
      // debugger
      if (shapeFlags & ShapeFlags.ELEMENT) {
        processElement(vnode, container);
      } else if (shapeFlags & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container)
      }
      break;
  }
}

function processComponent(initialVNode: any, container: any) {
  mountComponent(initialVNode, container)
}

function mountComponent(initialVNode: any, container) {
  const instance = createComponentInstance(initialVNode)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)
  console.log(`sub tree -> `, subTree)
  // vnode -> patch

  patch(subTree, container)
  initialVNode.el = subTree.el
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const el = vnode.el = document.createElement(vnode.type)
  const { children, props, shapeFlags } = vnode

  if (shapeFlags & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlags & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(children, el)
  }

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const val = props[key];
      const isOn = /^on[A-Z]/.test(key)
      if (isOn) {
        const event = key.slice(2).toLocaleLowerCase()
        el.addEventListener(event, val)
      } else {
        el.setAttribute(key, val)
      }

    }
  }
  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.forEach(e => patch(e, container))
}

function processFragment(vnode: any, container: any) {
  const { children } = vnode
  mountChildren(children, container)
}
function processText(vnode: any, container: any) {
  const { children } = vnode
  const el = vnode.el = document.createTextNode(children)
  container.append(el)
}

