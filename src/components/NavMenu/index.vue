<template>
    <div id="nav-menu">
        <div id="search-bar" v-el:searchbar>
            <search-input
                    placeholder="Search by username..."
                    :searchtext.sync="searchText"
                    @search="searchUsers"
                    @focus="fullNavMenu"
            ></search-input>
            <div id="cancel-button"
                 @click="openNavMenu"
            >Cancel</div>
        </div>
        <div id="user-list"
             @scroll="highlightSearchbar"
             v-el:userlist
        >
            <div id="loading" v-if="searching">
                <div class="loading"></div>
            </div>
            <a class="user-item animated"
               @click="userClick(`/user/${user.login}`)"
               transition="fade"
               stagger="100"
               v-for="user in users"
            >
                <avatar
                        class="user-avatar"
                        :src="`https://avatars.githubusercontent.com/u/${user.id.split('-')[1]}`"
                ></avatar>
                <div class="user-info">
                    <div class="fullname">{{user.fullname || user.login}}</div>
                    <div class="username">{{user.login || user.fullname}}</div>
                </div>
            </a>
        </div>
    </div>

</template>

<script type="text/Babel">
    import SearchInput from '../SearchInput/index.vue';
    import Avatar from '../Image/index.vue';
    import {
            openNavMenu,
            fullNavMenu,
            closeNavMenu,
            getUsers
    } from '../../vuex/actions';

    export default {
        data() {
            return {
                searchText: '',
                searching: false,
                wait: false
            }
        },
        vuex: {
            getters: {
                users: ({ navMenu }) => navMenu.users
            },
            actions: {
                openNavMenu,
                fullNavMenu,
                closeNavMenu,
                getUsers
            }
        },
        attached() {
            this.searchUsers()
        },
        components: {
            SearchInput,
            Avatar
        },
        methods: {
            searchUsers() {

                if(this.searching){
                    return false
                }

                this.searching = true
                this.getUsers(this.searchText).finally(() => {
                    this.searching = false
                })
            },
            userClick(url) {
                this.closeNavMenu();
                setTimeout(() => {
                        this.$router.go(url);
                }, 300)
            },
            highlightSearchbar() {
                let lastScrollTop = this.$els.userlist.scrollTop;
                if (!this.wait) {
                    window.requestAnimationFrame(() => {
                        if (lastScrollTop > 0) {
                        this.$els.searchbar.classList.add('dark-bg');
                    } else {
                        this.$els.searchbar.classList.remove('dark-bg');
                    }
                    this.wait = false;
                });
                    this.wait = true;
                }
            }
        },
        transitions: {
            'fade': {
                enterClass: 'fadeInUp',
                leaveClass: 'fadeOutRight'
            }
        }
    }
</script>