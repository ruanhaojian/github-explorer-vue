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
import 'github-markdown-css/github-markdown.css'
import './assets/scss/index.scss'


Vue.use (VueRouter)
// Vue.config.devtools = true
Object.keys (filters).forEach (k => Vue.filter (k, filters[k]))

const router = new VueRouter ({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  suppressTransitionError: true,
  // transitionOnLoad: false
})

sync (store, router)
configRouter (router)

router.beforeEach (function ({to, next, redirect}) {

  FastClick.attach (document.body)

})

router.start (Vue.extend (App), '#root')
window.router = router


/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
