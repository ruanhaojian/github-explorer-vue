import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import configRouter from './routers'
import filters from './filters'
import FastClick from 'fastclick'
import App from './App'
import './assets/styles/animate.css'
import 'font-awesome/css/font-awesome.css'
import './assets/fonts/GothamPro/styles.css';
import './assets/fonts/GothamPro-Bold/styles.css';
import './assets/fonts/GothamPro-Medium/styles.css';
import './assets/scss/index.scss'

// plugins
// import Device from 'vux/src/plugins/device'
// import ToastPlugin from 'vux/src/plugins/toast'
// import AlertPlugin from 'vux/src/plugins/alert'

Vue.use (VueRouter)
// Vue.config.devtools = true
Object.keys (filters).forEach (k => Vue.filter (k, filters[k]))

// $device
// Vue.use(Device)
// Vue.use(ToastPlugin)
// Vue.use(AlertPlugin)

const router = new VueRouter ({
  // hashbang: true,
  // history: false,
  // saveScrollPosition: true,
  // suppressTransitionError: true,
  // transitionOnLoad: false
})



let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

/**
 * sync router loading status
 */
const commit = store.commit || store.dispatch
router.beforeEach(({ to, from, next }) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  // 必须延时 不然动画不对
  setTimeout(next, 50)
})

sync (store, router)
configRouter (router)

router.beforeEach (function ({to, next, redirect}) {
  
  FastClick.attach (document.body)
  
  if (to.auth) {
    if (true) {
      next ()
    } else {
      redirect ('/login?redirect=' + encodeURIComponent (to.path))
    }
  } else {
    next ()
  }
  
})

router.start (Vue.extend (App), '#root')
window.router = router


/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
