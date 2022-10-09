import { shallowReadonly } from '../reactivity/reactive';
import { emit } from './componentEmit';
import { initSlots } from './componentSlots';
import { PublicInstanceProxyHanlders } from './conponentPublicInstance';
import { initProps } from './initComponentProps';


export function createComponentInstance(vnode, parent) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
    emit: () => { }
  }
  component.emit = emit.bind(null, component) as any
  return component
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props)
  initSlots(instance, instance.vnode.children)

  initStatefulComponents(instance)
}

function initStatefulComponents(instance: any) {
  const component = instance.type

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHanlders)
  const { setup } = component
  if (setup) {
    setInstance(instance)
    const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit })
    setInstance(null)
    handleSetupResult(instance, setupResult)
  }
}
function handleSetupResult(instance, setupResult: any) {
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  } else {
    // TODO
  }

  finishSetupResult(instance)
}

function finishSetupResult(instance: any) {
  const config = instance.type

  if (config.render) {
    instance.render = config.render
  }
}

let currentInstance
export function getCurrentInstance() {
  return currentInstance
}

export function setInstance(ins) {
  currentInstance = ins
}