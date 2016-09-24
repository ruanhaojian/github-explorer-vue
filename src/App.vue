<template>
    <div id="app">
        <Toaster></Toaster>
        <menu-open-state-handler></menu-open-state-handler>
        <menu-full-state-handler></menu-full-state-handler>
        <div id="menu-overlay"
             @click="closeNavMenu"
        ></div>
        <nav-menu></nav-menu>
        <main-content></main-content>
    </div>
</template>

<script type="text/Babel">
    import store from './vuex/store'
    import Toaster from './components/Toaster/index.vue'
    import MainContent from './components/MainContent/index.vue'
    import MenuOpenStateHandler from './components/MenuOpenStateHandler/index.vue'
    import MenuFullStateHandler from './components/MenuFullStateHandler/index.vue'
    import NavMenu from './components/NavMenu/index.vue'
    import { closeNavMenu } from './vuex/actions'

    export default {
        store,
        vuex: {
            actions: {
                closeNavMenu
            }
        },
        components: {
            MenuOpenStateHandler,
            MenuFullStateHandler,
            NavMenu,
            Toaster,
            MainContent
        }
    }
</script>

<style scoped>


</style>
