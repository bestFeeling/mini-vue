import { h } from "../lib/mini-vue.esm.js";

export default {
  name: 'Foo',
  setup (props, { emit }) {
    console.log(props)
    props.count++;
    console.log(props)

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
    return h('div', {}, [foo, btn])
  }
}