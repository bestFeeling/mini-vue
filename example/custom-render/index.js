import { createRender } from '../../lib/mini-vue.esm.js'
import { App } from './App.js'
console.log(PIXI)
const game = new PIXI.Application({
  width: 500,
  height: 500
})
document.body.append(game.view)

const render = createRender({
  createElement: function (type) {
    if (type === 'rect') {
      const rect = new PIXI.Graphics()
      rect.beginFill(0xff0000)
      rect.drawRect(0, 0, 100, 100)
      rect.endFill()
      return rect
    }
  },
  patchProps: function (el, key, val) {
    el[key] = val
  },
  insert: function (container, el) {
    container.addChild(el)
  }
})

const rootContainer = document.getElementById('app')
render.createApp(App).mount(game.stage)