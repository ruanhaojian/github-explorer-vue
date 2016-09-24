<template >
    <div id="repo-list-page"
         class="transition-item animated"
         :style="{ 'top': offsetTop }"
         style="animation-duration: .5s;"
         transition="zoom"
    >
        <div id="search-wrapper" v-el:searchwrapper>
            <search-input
                    placeholder="Find a repository..."
                    :searchtext.sync="searchText"
                    buttonText="SEARCH"
                    @search="searchBarAction"
                    class="animated"
                    transition="lineup"
            ></search-input>
        </div>
        <div id="scroll-wrapper" v-el:scrollwrapper @scroll="scroll">
            <div id="repo-list">

                <div v-if="!repos.length && isSearching"
                     class="empty-data"
                >
                    :-( Sad... No result found!
                </div>
                <template v-else>
                    <div>
                        <div>
                            <repo-item
                                    v-for="repo in repos"
                                    :repo="repo"
                                    class="animated"
                                    transition="lineup"
                                    stagger="100"
                                    style="animation-duration: .3s;"
                                    track-by="id"
                            ></repo-item>
                        </div>
                        <div id='load-more'
                             v-if="!complete && repos.length > 0"
                             @click="loadMore"
                        >
                            {{isSearching ? 'LOADING...' : 'LOAD MORE'}}
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script type="text/Babel">
    import SearchInput from '../SearchInput/index.vue';
    import RepoItem from '../RepoItem/index.vue';

    import {
            searchUserRepos
    } from '../../vuex/actions';

    export default {
        data() {
            return {
                searchText: '',
                isSearching: false,
                wait: false,
                offsetTop: 0
            }
        },
        vuex: {
            getters: {
                repos : ({ repoList }) => repoList.repos,
                page : ({ repoList }) => repoList.page,
                complete : ({ repoList }) => repoList.complete,
            },
            actions: {
                searchUserRepos,
            },
        },
        components: {
            SearchInput,
            RepoItem
        },
        route: {
            data() {

                this.searchBarAction();

                this.$dispatch('UNMOUNT_HEADER_CHANGE');
            },
        },
        methods: {
            scroll() {
                let lastScrollTop = this.$els.scrollwrapper.scrollTop;
                if (!this.wait) {
                    window.requestAnimationFrame(() => {
                        if (lastScrollTop > 0) {
                            this.$els.searchwrapper.classList.add('shadow');
                        } else {
                            this.$els.searchwrapper.classList.remove('shadow');
                        }
                        this.wait = false;
                    });
                    this.wait = true;
                }
            },
            searchBarAction(){

                this.$els.scrollwrapper.scrollTop = 0

                this.customSearchUserRepos(this.$route.params.username,this.searchText,1)

            },
            loadMore(){

                this.customSearchUserRepos(this.$route.params.username,this.searchText,this.page + 1)

            },
            customSearchUserRepos(username, keyword, page) {

                if(this.isSearching){
                    return false
                }


                this.isSearching = true
                this.searchUserRepos(username, keyword, page).finally(() => {
                    this.isSearching = false
                })
            },
        },
        transitions: {
            'zoom': {
                enterClass: 'zoomIn',
                leaveClass: 'zoomOut'
            },
            'lineup': {
                enterClass: 'fadeInUp',
                leaveClass: 'fadeOutDown'
            }
        }

    }
</script>