
import { h } from '../lib/mini-vue.esm.js'
import Foo from './Foo.js';

export const App = {
  render () {
    window.top.self = this;
    console.log('now render !')
    return h('div', {
      id: 'root',
      class: ['red', 'hard'],
    },
      [
        h('p', {
          class: 'red',
          onClick: () => { console.log('click') },
          onMousedown: () => console.log('down ~'),
        }, 'hi'),

        h(Foo, { count: 10 }),
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