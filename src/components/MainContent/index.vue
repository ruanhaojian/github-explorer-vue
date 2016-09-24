<template>
    <div id='main-content' >
        <header-bar></header-bar>
        <div id="scroll-section" @scroll="$broadcast('scrollEvent')" v-el:scrollSection>
            <router-view keep-alive :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"></router-view>
            <footer-bar v-if="$route.name !== 'USER_REPO_LIST'"></footer-bar>
        </div>
    </div>
</template>

<script type="text/Babel">
    import HeaderBar from '../Header/index.vue'
    import FooterBar from '../Footer/index.vue'

    export default {
        components:{ HeaderBar, FooterBar },
        vuex: {
            getters: {
                route: (state) => state.route,
                direction: (state) => state.direction
            },
            actions:{

            }
        },

        methods:{

        },
        events: {
            'MOUNT_HEADER_CHANGE': function() {
                this.$broadcast('MOUNT_HEADER_CHANGE');
            },
            'UNMOUNT_HEADER_CHANGE': function() {
                this.$broadcast('UNMOUNT_HEADER_CHANGE');
            }
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
