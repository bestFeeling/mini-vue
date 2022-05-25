function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type
    };
    return component;
}
function setupComponent(instance) {
    // initProps
    // initSlots
    initStatefulComponents(instance);
}
function initStatefulComponents(instance) {
    const component = instance.type;
    const { setup } = component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishSetupResult(instance);
}
function finishSetupResult(instance) {
    const config = instance.type;
    if (config.render) {
        instance.render = config.render;
    }
}

function render(vnode, container) {
    // patch
    patch(vnode);
}
function patch(vnode, container) {
    processComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    // vnode -> patch
    patch(subTree);
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children
    };
    return vnode;
}

const createApp = (rootComponent) => {
    return {
        mount(rootContainer) {
            // 将组件转换成虚拟节点
            const vnode = createVNode(rootComponent);
            render(vnode);
        }
    };
};

function h(ype, props, children) {
    return createVNode(ype, props, children);
}

export { createApp, h };
