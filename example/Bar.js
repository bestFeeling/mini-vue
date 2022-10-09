import { h, provide, inject } from "../lib/mini-vue.esm.js";

export default {
  name: 'Bar',
  setup (props, { emit }) {
    provide('level', 'level3')
    const val = inject('level')
    console.log('val in level3', val)
  },
  render () {
    return h('div', {}, 'bar')
  }
}