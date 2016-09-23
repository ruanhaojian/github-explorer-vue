<template>
  <div id="app">
    <Toaster></Toaster>
    <main-content></main-content>
  </div>
</template>

<script>
import store from './vuex/store'
import Toaster from './components/Toaster'
import MainContent from './components/MainContent'

export default {
  store,
  components: {
    Toaster,
    MainContent
  }
}
</script>

<style scoped>



</style>
