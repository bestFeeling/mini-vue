import { PublicInstanceProxyHanlders } from './conponentPublicInstance';


export function createComponentInstance(vnode) {

  const component = {
    vnode,
    type: vnode.type,
    setupState: {}
  }

  return component
}

export function setupComponent(instance) {
  // initProps
  // initSlots

  initStatefulComponents(instance)
}

function initStatefulComponents(instance: any) {
  const component = instance.type

  instance.proxy = new Proxy({_:instance}, PublicInstanceProxyHanlders)
  const { setup } = component
  if (setup) {
    const setupResult = setup()
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


