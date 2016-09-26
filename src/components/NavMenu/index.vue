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
            <div class="user-item animated"
               v-for="user in users"
               transition="fade"
               stagger="100"
               @click="userClick(user.login)"
            >
                <avatar
                        class="user-avatar"
                        :src="'https://avatars.githubusercontent.com/u/' + user.id.split('-')[1]"
                ></avatar>
                <div class="user-info">
                    <div class="fullname">{{user.fullname || user.login}}</div>
                    <div class="username">{{user.login || user.fullname}}</div>
                </div>
            </div>
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
            userClick(username) {
                this.closeNavMenu();
//                this.$router.go(url);
                setTimeout(() => {
                        this.$router.go({name: 'USER_DETAIL' , params: { username: username }});
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

<style>
    @keyframes spining {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loading {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        border: .25rem solid rgba(255,255,255,0.2);
        border-top-color: white;
        animation: spining 1s infinite linear;
        margin: 0 auto;
    }
</style>