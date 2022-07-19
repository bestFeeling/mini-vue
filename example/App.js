
import { h } from '../lib/mini-vue.esm.js'
import Foo from './Foo.js';
import Slots from './slots.js';

export const App = {
  name: 'App',
  render () {
    const el1 = h('div', {}, 'this is a div')
    const el2 = h('div', {}, [h(Slots, {}, {
      header: ({ age }) => h('p', {}, 'i am a slots ' + age),
      footer: () => h('p', {}, ' i am a slots2')
    })])
    window.top.self = this;
    console.log('now render !')
    return h('div', {
      id: 'root',
      class: ['red', 'hard'],
    },
      [
        el1,
        el2,
        h('p', {
          class: 'red',
          onClick: () => { console.log('click') },
          onMousedown: () => console.log('down ~'),
        }, 'hi'),

        h(Foo, {
          count: 10,
          onAdd (...arg) {
            console.log('parent add ', arg)
          },
          onAddOne (a) {
            console.log(`Add one ${a}`)
          }
        }),
        // this.$el
        // this.$props
        h('p', { class: 'red' }, this.msg),
        h('p', { class: 'blue' }, 'dom tag name -> ' + (this.$el && this.$el.tagName) || 'no'),
        h('div', { class: 'blue' }, [
          h('div', {}, 'inner div')
        ])
      ])
  },

  setup () {
    return {
      msg: ' form Nowell '
    }
  }
}