<template>
    <div>
        <div
                v-el:header
                class="header"
        >
            <hamburger-icon
                    :id="'hamberger-menu'"
                    :open=""
                    :back="shouldShowBackBtn()"
                    @click="hamburgerIconClick"
            ></hamburger-icon>
            <a v-link="{name:'HOME'}">
                <div id='brand-logo'></div>
            </a>
            <div id='notification-icon'></div>
        </div>
        <loading-block
                v-if="showLoading"
                :done="doneLoading"
                :failed="loadFailed"
        ></loading-block>
    </div>
</template>

<script type="text/Babel">
    import HamburgerIcon from '../HamburgerIcon/index.vue'
    import LoadingBlock from '../LoadingBlock/index.vue'
    import { ROUTES } from '../../routers'
    import { toggleNavMenu } from '../../vuex/actions'

    export default {
        components: {
            HamburgerIcon,
            LoadingBlock
        },
        vuex: {
            getters: {
                showLoading: ({ header }) => header.showLoading,
                doneLoading: ({ header }) => header.doneLoading,
                loadFailed: ({ header }) => header.loadFailed,
            },
            actions: {
                toggleNavMenu
            }
        },
        data() {
            return {
                scrollSection: null,
                wait: false
            }
        },
        methods: {
            shouldShowBackBtn() {
                switch (this.$route.name) {
                    case ROUTES.HOME: return false;
                    case ROUTES.USER_DETAIL: return false;
                    case ROUTES.USER_REPO_LIST: return 'USER_DETAIL';
                    case ROUTES.REPO_DETAIL: return 'USER_REPO_LIST';
                    default: return false;
                }
            },
            hamburgerIconClick() {
                const backRoute = this.shouldShowBackBtn();
                if (backRoute) {
                    this.$router.go({ name: backRoute })
                } else {
                    this.toggleNavMenu();
                }
            },
            isUserPage() {
                return this.$route.name === ROUTES.USER_DETAIL || this.$route.name === ROUTES.HOME;
            },
        },
        events: {
            'MOUNT_HEADER_CHANGE': function() {
                this.$els.header.classList.remove('transparent');
                this.$els.header.classList.add('transparent');
                this.scrollSection = document.getElementById('scroll-section');
                this.wait = false;
            },
            'UNMOUNT_HEADER_CHANGE': function() {
                this.$els.header.classList.remove('transparent');
            },
            scrollEvent() {
                let lastScrollTop = this.scrollSection.scrollTop;
                if (this.wait === false) {
                    window.requestAnimationFrame(() => {
                        // Access direct to the DOM for better scrolling performance
                        if (lastScrollTop === 0 && this.isUserPage()) {
                            this.$els.header.classList.add('transparent');
                        } else {
                            this.$els.header.classList.remove('transparent');
                        }
                        this.wait = false;
                    });
                    this.wait = true;
                }
            }
        },
    }
</script>

<style scoped>

</style>
