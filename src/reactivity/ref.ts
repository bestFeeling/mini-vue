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