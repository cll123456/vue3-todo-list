import { createApp } from 'vue' // 使用createApp 来导入一个vue的实例
import App from './App.vue' // 导入根节点
import './index.css'
// 到了3.X中则是通过使用createApp这个 API返回一个应用实例，并且可以通过链条的方式继续调用其他的方法
createApp(App).mount('#app')
