import { h } from "../lib/mini-vue.esm.js";

export default {
  setup (props) {
    console.log(props)
    props.count++;
    console.log(props)
  },
  render () {
    return h('div', {}, 'Foo : ' + this.count)
  }
}