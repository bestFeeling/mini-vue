import { h, renderSlots } from '../lib/mini-vue.esm.js'

export default {
  name: 'slot',
  setup () {

  },
  render () {
    console.log('slots -> ', this.$slots)
    const p1 = h('p', {}, 'this is p1 inslots')
    return h('div', {}, [renderSlots(this.$slots, 'header', { age: 18 }), p1, renderSlots(this.$slots, 'footer')])
  }
}