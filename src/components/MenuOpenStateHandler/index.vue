<template>
    <input type="checkbox" id="nav-menu-open-checkbox" :checked="open" />
</template>

<script type="text/Babel">

    export default {
        vuex: {
            getters: {
                open: ({ navMenu }) => navMenu.open
            }
        }
    }
</script>

<style >

</style>
