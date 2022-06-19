
import { createVNode } from "./vnode";

export function h(ype, props?, children?) {
  return createVNode(ype, props, children)
}