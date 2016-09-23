<template>
    <div>
        <div
                v-el:header
                class="header"
        >
            <hamburger-icon
                    :id="'hamberger-menu'"
            ></hamburger-icon>
            <a v-link="{name:'index'}">
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
                this.$els.header.classList.remove('transparent')
                this.$els.header.removeEventListener('scroll', this.scrollEvent)
            },
            scrollEvent () {
                var _this = this

                _this.lastScrollTop = _this.scrollSection.scrollTop
                if (_this.wait === false) {
                    window.requestAnimationFrame(() => {
                        // Access direct to the DOM for better scrolling performance
                        if (_this.lastScrollTop === 0) {
                            _this.$els.header.classList.add('transparent')
                        } else {
                            _this.$els.header.classList.remove('transparent')
                        }
                        _this.wait = false
                    })
                    _this.wait = true
                }
            },
            regEvent () {
                this.unmountHeaderChange() // Make sure there is no multiple mount
                this.$els.header.classList.add('transparent')
                this.scrollSection = document.getElementById('scroll-section')
                this.wait = false

                var _this = this
                this.scrollSection.addEventListener('scroll', this.scrollEvent)
            }
        }
    }
</script>

<style scoped>

</style>
