<template>
    <div>
        <div
                ref='header'
                class="header"
        >
            <hamburger-icon
                    :id="'hamberger-menu'"
            ></hamburger-icon>
            <a v-link="{path:'/'}">
                <div id='brand-logo'></div>
            </a>
            <div id='notification-icon'></div>
        </div>
    </div>
</template>

<script type="text/Babel">
    import HamburgerIcon from '../HamburgerIcon/index.vue'

    export default {
        components: {
            HamburgerIcon
        },
        vuex: {
            getters: {},
            actions: {}
        },
        created(){

        },
        ready(){

            this.regEvent()


        },
        beforeDestory () {

        },
        methods: {
            unmountHeaderChange () {
                this.refs.header.classList.remove('transparent')
                // this.refs.header.removeEventListener('scroll')
            },
            regEvent () {
                this.unmountHeaderChange() // Make sure there is no multiple mount
                this.refs.header.classList.add('transparent')
                this.scrollSection = document.getElementById('scroll-section')
                this.wait = false

                var _this = this
                this.scrollSection.addEventListener('scroll', function () {

                    if (!_this.state.isUserPage) {
                        return false
                    }

                    _this.lastScrollTop = _this.scrollSection.scrollTop
                    if (_this.wait === false) {
                        window.requestAnimationFrame(() => {
                            // Access direct to the DOM for better scrolling performance
                            if (_this.lastScrollTop === 0) {
                                _this.refs.header.classList.add('transparent')
                            } else {
                                _this.refs.header.classList.remove('transparent')
                            }
                            _this.wait = false
                        })
                        _this.wait = true
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
