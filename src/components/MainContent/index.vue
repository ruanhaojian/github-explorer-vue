<template>
    <div id='main-content' >
        <my-header></my-header>
        <div
                id='scroll-section'
                ref='scrollSection'
        >

            <router-view :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"></router-view>
        </div>
    </div>
</template>

<script type="text/Babel">
    import MyHeader from '../Header/index.vue'

    export default {
        components:{ MyHeader },
        vuex: {
            getters: {
                route: (state) => state.route,
                direction: (state) => state.direction
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

    /* v-r-transition, default is {forward: 'forward', back: 'back'}*/
    .forward-enter, .forward-leave {
        transform: translate3d(-100%, 0, 0);
    }

    .back-enter, .back-leave {
        transform: translate3d(100%, 0, 0);
    }

    /**
    * vue-router transition
    */
    .vux-pop-out-transition,
    .vux-pop-in-transition {
        width: 100%;
        animation-duration: 0.5s;
        animation-fill-mode: both;
        backface-visibility: hidden;
    }

    .vux-pop-out-enter,
    .vux-pop-out-leave,
    .vux-pop-in-enter,
    .vux-pop-in-leave {
        will-change: transform;
        height: 100%;
        position: absolute;
        left: 0;
    }

    .vux-pop-out-enter {
        animation-name: popInLeft;
    }

    .vux-pop-out-leave {
        animation-name: popOutRight;
    }

    .vux-pop-in-enter {
        perspective: 1000;
        animation-name: popInRight;
    }

    .vux-pop-in-leave {
        animation-name: popOutLeft;
    }

    @keyframes popInLeft {
        from {
            transform: translate3d(-100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes popOutLeft {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(-100%, 0, 0);
        }
    }

    @keyframes popInRight {
        from {
            transform: translate3d(100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes popOutRight {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(100%, 0, 0);
        }
    }
</style>
