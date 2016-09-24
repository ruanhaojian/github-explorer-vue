<template>
    <input type="checkbox" id="nav-menu-full-checkbox" :checked="full" />
</template>

<script type="text/Babel">

    export default {
        vuex: {
            getters: {
                full: ({ navMenu }) => navMenu.full
            }
        }
    }
</script>

<style >

</style>
