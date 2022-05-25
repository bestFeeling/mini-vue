
import { h } from '../lib/mini-vue.esm.js'

console.log(h, 'h~')

export const App = {
  render () {
    return h('div', `hello ${this.msg}`)
  },

  setup () {
    return {
      msg: 'mini-vue'
    }
  }
}