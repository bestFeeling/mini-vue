
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: [
     // cjs  common js
     {
       format: 'cjs',
       file: 'lib/mini-vue.cjs.js'
     },
     {
      format: 'es',
      file: 'lib/mini-vue.esm.js'
    }
  ],
  plugins: [
    typescript()
  ]
}