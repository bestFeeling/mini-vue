import { shallowReadonly } from '../reactivity/reactive';
import { emit } from './componentEmit';
import { PublicInstanceProxyHanlders } from './conponentPublicInstance';
import { initProps } from './initComponentProps';


export function createComponentInstance(vnode) {

  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    emit: () => { }
  }
  component.emit = emit.bind(null, component) as any
  return component
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props)
  // initSlots

  initStatefulComponents(instance)
}

function initStatefulComponents(instance: any) {
  const component = instance.type

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHanlders)
  const { setup } = component
  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit })
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


