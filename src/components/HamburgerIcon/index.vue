<template>
    <div
            id="{{id}}"
            class="nav-icon"
            :class="{
                'open': open,
                'back': back
            }"
    >
        <div class='nav-icon-bars'>
            <span ></span>
            <span ></span>
            <span ></span>
        </div>
    </div>
</template>

<script type="text/Babel">

    export default {
        props: [ 'id', 'open', 'back' ],
    }
</script>

<style scoped>

</style>
