import { h, provide, inject } from "../lib/mini-vue.esm.js";
import Bar from "./Bar.js";

export default {
  name: 'Foo',
  setup (props, { emit }) {
    console.log(props)
    props.count++;
    console.log(props)

    provide('level', 'level2')
    const val = inject('level')
    console.log('val in level2', val)

    const btnClick = () => {
      console.log('btn click')
      emit('add', 1, 2, 3, 4)
      emit('add-one', 10)
    }
    return {
      btnClick
    }
  },
  render () {
    const foo = h('p', {}, 'Foo : ' + this.count)
    const btn = h('button', { onClick: this.btnClick }, 'btnClick')
    return h('div', {}, [h(Bar), foo, btn])
  }
}