import { ShapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { createAppApi } from "./createApp"
import { Fragment, Text } from "./vnode"

export function createRender(options) {

  const { createElement: HostCreateElement, patchProps: HostPatchProps, insert: HostInsert } = options

  function render(vnode, container) {
    // patch
    patch(vnode, container, null)
  }

  function patch(vnode: any, container: any, parent) {
    const { type } = vnode
    switch (type) {
      case Fragment:
        processFragment(vnode, container, parent)
        break;
      case Text:
        processText(vnode, container)
        break;
      default:

        const { shapeFlags } = vnode
        // debugger
        if (shapeFlags & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parent);
        } else if (shapeFlags & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parent)
        }
        break;
    }
  }

  function processComponent(initialVNode: any, container: any, parent) {
    mountComponent(initialVNode, container, parent)
  }

  function mountComponent(initialVNode: any, container, parent) {
    const instance = createComponentInstance(initialVNode, parent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container)
  }

  function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)
    console.log(`sub tree -> `, subTree)
    // vnode -> patch

    patch(subTree, container, instance)
    initialVNode.el = subTree.el
  }

  function processElement(vnode: any, container: any, parent) {
    mountElement(vnode, container, parent);
  }

  function mountElement(vnode: any, container: any, parent) {
    // const el = vnode.el = document.createElement(vnode.type)
    const el = vnode.el = HostCreateElement(vnode.type)
    const { children, props, shapeFlags } = vnode

    if (shapeFlags & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlags & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el, parent)
    }

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const val = props[key];
        // const isOn = /^on[A-Z]/.test(key)
        // if (isOn) {
        //   const event = key.slice(2).toLocaleLowerCase()
        //   el.addEventListener(event, val)
        // } else {
        //   el.setAttribute(key, val)
        // }
        HostPatchProps(el, key, val)
      }
    }
    // container.append(el)
    HostInsert(container, el)
  }

  function mountChildren(vnode, container, parent) {
    vnode.forEach(e => patch(e, container, parent))
  }

  function processFragment(vnode: any, container: any, parent) {
    const { children } = vnode
    mountChildren(children, container, parent)
  }
  function processText(vnode: any, container: any) {
    const { children } = vnode
    const el = vnode.el = document.createTextNode(children)
    container.append(el)
  }

  return {
    createApp: createAppApi(render)
  }

}