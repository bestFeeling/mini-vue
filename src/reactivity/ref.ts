import { isObject } from './../shared/index';
import { tractEffect, triggerEffect } from "./effect";
import { reactive } from './reactive';

/**
 * 存疑
 * 如果是一个普通类型， 能不能直接当成对象处理 
 * 比如 this._value = {value: value}
 */
class RefImpl {
  private _value: any;
  private _rawValue: any;
  public __v_isref = true;
  dep: Set<unknown>;

  constructor(value) {
    this._rawValue = value
    this.dep = new Set()
    this._value = convert(value)
  }

  get value() {

    tractEffect(this.dep)
    return this._value
  }

  set value(newValue) {
    if (newValue == this._rawValue) return
    this._value = convert(newValue)
    this._rawValue = newValue
    triggerEffect(this.dep)
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(ref) {
  return !!ref.__v_isref
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objWithRefs) {
  return new Proxy(objWithRefs, {
    set: function (target, key, value) {
      if (!isRef(value)) {
        // 让被代理的objWithRefs的value发生改变
        target[key].value = value
        return true
      } else
        return Reflect.set(target, key, value)
    },
    get: function (target, key) {
      return unRef(Reflect.get(target, key))
    }
  })
}