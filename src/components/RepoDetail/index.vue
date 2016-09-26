<template>
    <div id="repo-detail"
         class="transition-item animated"
         transition="zoom"
         :style="{'transform': transStyle}"
         style="animation-duration: .5s;"
    >
        <repo-content :repo="repo"></repo-content>
        <div class="tab-wrapper-transition-group">
            <div id="repo-tabs-wrapper" v-el:tabwrapper>
                <div id="repo-tabs">
                    <div v-for="tab in TABS"
                         @click="switchTab(tab)"
                         class="repo-tab-item"
                         :class="{ 'selected':  (activeTab === tab.key) }"
                    >
                        {{ tab.value }}
                    </div>
                </div>
            </div>
        </div>
        <div class="offline-msg" v-if="loadFailed">
            You are offline!
            <div @click="getProfile" class="blue-link">Try again</div>
        </div>
        <div v-el:tabcontent id="repo-tab-content">
            <div id="readme"
                 class="repo-content-item markdown-body"
                 :class="{ 'show': (activeTab === 'readme') }"
            >
                <vue-markdown :source="readme"></vue-markdown>
                <div class="empty-data" v-if="!readme">No data</div>
            </div>
            <div id="files"
                 class="repo-content-item"
                 :class="{ 'show': (activeTab === 'files') }"
            >
                <template v-for="content in contents">
                    <div class="file-item">
                        <div class="file-icon">
                            <i class="fa fa-file-text-o" v-if="content.type === 'file'"></i>
                            <i class="fa fa-folder" v-else></i>
                        </div>
                        <div class="file-info">
                            <div class="file-name">{{ content.name }}</div>
                            <div class="file-date">
                                {{ content.size | transToSize }}
                            </div>
                        </div>
                    </div>
                </template>
                <div class="empty-data" v-if="!contents.length">No data</div>
            </div>
            <div id="contributors"
                 class="repo-content-item"
                 :class="{ 'show': (activeTab === 'contributors') }"
            >
                <div class="contrib-item"
                     v-for="contrib in contribs"
                >
                    <div class="contrib-avatar"
                         :style="{'backgroundImage': 'url(' + contrib.avatar_url + ')'}"
                    ></div>
                    <div class="contrib-info">
                        <div class="contrib-name">{{contrib.login}}</div>
                        <div class="contrib-value">{{contrib.contributions}} {{' '}}
                            contribution{{contrib.contributions === 1 ? '' : 's'}}
                        </div>
                    </div>
                </div>
                <div class="empty-data" v-if="!contribs.length">No data</div>
            </div>
            <div id="languages"
                 class="repo-content-item"
                 :class="{ 'show': (activeTab === 'languages') }"
            >
                <div class="lang-item" v-for="language in languages">
                    <div class="lang-color"
                         :style="{ backgroundColor: getColor(language.name) }"
                    ></div>
                    <div class="lang-info">
                        <div class="lang-name">{{language.name}}</div>
                        <div class="lang-value">{{language.value}}%</div>
                    </div>
                </div>
                <div class="empty-data" v-if="!languages.length">No data</div>
            </div>
        </div>
    </div>
</template>

<script type="text/Babel">
    import RepoContent from '../RepoContent/index.vue';
    import VueMarkdown from 'vue-markdown';
    import COLORS from '../../assets/language-colors.json';

    import { Base64 } from 'js-base64';
    import filesize from 'filesize';

    import { getRepoPageDetail } from '../../vuex/actions'

    export default {
        data() {
            return {
                activeTab: '',

                doTransform: false,
                offsetTop: 0,
                loadFailed: false,
                startPosition: {
                    top: 0,
                    left: 0,
                    right: 0,
                },
                TABS: [
                    { key: 'readme', value: 'README' },
                    { key: 'files', value: 'FILES & DIRECTORIES' },
                    { key: 'contributors', value: 'CONTRIBUTORS' },
                    { key: 'languages', value: 'LANGUAGES' },
                ],

                scrollDom: null,
                wait: false,

            }
        },
        computed: {
            transStyle() {
                return this.doTransform ? `translate3d(0, ${this.startPosition.top + offsetTop - 60}px, 0)` : '';
            }
        },
        vuex: {
            getters: {
                repoData   : {},
                repo       : ({ repoDetail }) => repoDetail.repo,
                readme     : ({ repoDetail }) => repoDetail.readme,
                contribs   : ({ repoDetail }) => repoDetail.contribs,
                contents   : ({ repoDetail }) => repoDetail.contents,
                languages  : ({ repoDetail }) => repoDetail.languages,
            },
            actions: {
                getRepoPageDetail
            }
        },
        components: {
            RepoContent,
            VueMarkdown
        },
        route: {
            data() {
//                this.scrollDom = document.getElementById('scroll-section');
//                this.scrollDom.addEventListener('scroll', this.onSectionScroll)
            }
        },
        attached() {
            this.$parent.$els.scrollsection.scrollTop = 0

            this.getProfile();
            this.$dispatch('MOUNT_HEADER_CHANGE');
            this.$dispatch('UNMOUNT_HEADER_CHANGE');


        },
        methods: {
            getProfile() {
                let args = [this.$route.params.username, this.$route.params.repoName];

                this.getRepoPageDetail(...args).then(() => {
                    this.loadFailed = false;
                    this.activeTab = 'readme';
                    setTimeout(() => {
                        this.refreshContentHeight(this.TABS[0]);
                    },500)
                }, () => {
                    this.loadFailed = true;
                });

            },
            switchTab(tab) {
                this.activeTab = tab.key;
                this.refreshContentHeight(tab);
            },
            refreshContentHeight(tab) {
                const selectedTab = document.getElementById(tab.key);
                this.$els.tabcontent.style.height = `${selectedTab.offsetHeight + 30}px`;
            },
            getColor(language) {
                return COLORS[language].color;
            },
            onSectionScroll(){
                this.lastOffsetTop = this.$els.tabwrapper.parentElement.getBoundingClientRect().top;
                if (!this.wait) {
                    window.requestAnimationFrame(() => {
                        if (this.lastOffsetTop < 60) {
                            this.$els.tabwrapper.classList.add('fixed');
                        } else {
                            this.$els.tabwrapper.classList.remove('fixed');
                        }
                        this.wait = false;
                    });
                    this.wait = true;
                }
            }
        },
        filters: {
            transToSize(size) {
                if (!size) return '';
                return filesize(size);
            },
        },
        events: {
            scrollEvent() {
                let tabwrapper = this.$els.tabwrapper
                let lastOffsetTop = tabwrapper.parentElement.getBoundingClientRect().top;
                if (!this.wait) {
                    window.requestAnimationFrame(() => {
                        if (lastOffsetTop < 60) {
                            tabwrapper.classList.add('fixed');
                            //tabwrapper.style.position = 'absolute'
                            //tabwrapper.style.top = 60 + 'px'
                        } else {
                            tabwrapper.classList.remove('fixed');
                            //tabwrapper.style.position = 'relative'
                            //tabwrapper.style.top = 0 + 'px'
                        }
                        this.wait = false;
                    });
                    this.wait = true;
                }
            }
        },
        transitions: {
            'zoom': {
                enterClass: 'zoomIn',
                leaveClass: 'zoomOut'
            },
        }
    }
</script>

