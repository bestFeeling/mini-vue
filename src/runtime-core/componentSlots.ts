import { ShapeFlags } from "../shared/shapeFlags"

export const initSlots = (instance, children) => {
  const { vnode } = instance
  if (vnode.shapeFlags & ShapeFlags.SLOT_CHILDRNE) {
    normalizeObjectSlots(children, instance.slots)
  }
}

function normalizeObjectSlots(children: any, slots: any) {
  for (const key in children) {
    const value = children[key]
    slots[key] = (props) => normalize(value(props))
  }
}

function normalize(value: any): any {
  return Array.isArray(value) ? value : [value]
}

