
import { h } from '../lib/mini-vue.esm.js'

export const App = {
  render () {
    window.top.self = this;
    console.log('now render !')
    return h('div', {
      id: 'root',
      class: ['red', 'hard'],
    },
      [
        h('p', { class: 'red' }, 'hi'),
        // this.$el
        // this.$props
        h('p', { class: 'red' }, this.msg),
        h('p', { class: 'blue' }, 'dom tag name -> ' + (this.$el && this.$el.tagName) || 'no'),
        h('p', { class: 'blue' }, 'mini-vue')
      ])
  },

  setup () {
    return {
      msg: ' form Nowell '
    }
  }
}