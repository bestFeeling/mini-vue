import { createRender } from "./renderer"
import { createVNode } from "./vnode"

export function createAppApi(render) {
  return function createApp(rootComponent) {
    return {
      mount(continer) {
        // 将组件转换成虚拟节点
        const vnode = createVNode(rootComponent)
        render(vnode, continer)
      }
    }
  }
}