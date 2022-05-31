'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = (val) => val != null && typeof val === 'object';

const publicPropertyMap = {
    $el: (i) => i.vnode.el
};
const PublicInstanceProxyHanlders = {
    get: function ({ _: instance }, key) {
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        const publicGetter = publicPropertyMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    }
};

function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {}
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
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHanlders);
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
    patch(vnode, container);
}
function patch(vnode, container) {
    console.log('vnode type ->', vnode.type);
    // debugger
    if (typeof vnode.type === 'string') {
        processElement(vnode, container);
    }
    else if (isObject(vnode.type)) {
        processComponent(vnode, container);
    }
}
function processComponent(initialVNode, container) {
    mountComponent(initialVNode, container);
}
function mountComponent(initialVNode, container) {
    const instance = createComponentInstance(initialVNode);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    console.log(`sub tree -> `, subTree);
    // vnode -> patch
    patch(subTree, container);
    initialVNode.el = subTree.el;
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const el = vnode.el = document.createElement(vnode.type);
    const { children, props } = vnode;
    if (typeof children === 'string') {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        mountChildren(children, el);
    }
    for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            const val = props[key];
            el.setAttribute(key, val);
        }
    }
    container.append(el);
}
function mountChildren(vnode, container) {
    vnode.forEach(e => patch(e, container));
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        el: null,
    };
    return vnode;
}

const createApp = (rootComponent) => {
    return {
        mount(continer) {
            // 将组件转换成虚拟节点
            const vnode = createVNode(rootComponent);
            render(vnode, continer);
        }
    };
};

function h(ype, props, children) {
    return createVNode(ype, props, children);
}

exports.createApp = createApp;
exports.h = h;