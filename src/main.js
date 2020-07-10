import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ml from './ml'
import filters from './filters'
import VueChatScroll from 'vue-chat-scroll'

const requireComponent = require.context(
  // Look for files in the directory
  './components',
  // Look in subdirectories
  true,
  /[\w-]+\.vue$/
  // /[A-Z]\w+\.(vue|js)$/
)

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');
    // Remove the "./" from the beginning
    // .replace(/^\.\//, '')
    // // Remove the file extension from the end
    // .replace(/\.\w+$/, '')
    // Split up kebabs
    // .split('-')
    // // Upper case
    // .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // // Concatenated
    // .join('')

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
});

new Vue({
  render: h => h(App),
  router,
  created() {
  }
}).$mount('#app')

Vue.use(VueChatScroll)