<template>
    <div
            id="{{id}}"
            onClick={props.onClick}

            class="nav-icon"
            :class="{
                'open' : open,
                'back' : back,
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
        components:{  },
        props: [ 'id' ],
        vuex: {
            getters: {

            },
            actions:{

            }
        },
        created(){

        },

        methods:{

        }
    }
</script>

<style scoped>

</style>
