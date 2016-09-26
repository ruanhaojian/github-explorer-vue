<template>
    <div id='user-page'>

        <Profile
                :username="profile.login"
                :profile="profile"
        ></Profile>

        <div class='repo-list'>
            <div class='repo-list-header'>POPULAR REPOSITORIES</div>
            <div>
                <repo-item
                        v-for="repo in repos"
                        :repo="repo"
                        class="animated"
                        transition="lineup"
                        stagger="80"
                        style="animation-duration: .3s;"
                ></repo-item>
            </div>
        </div>
        <a
                v-link="{ name : 'USER_REPO_LIST' , params: { username: this.profile.login }}"
                class='view-all-btn'
        >
        VIEW ALL REPOS
        </a>
    </div>
</template>

<script type="text/Babel">
    import Profile from '../Profile/index.vue'
    import RepoItem from '../RepoItem/index.vue'
    import { getRandomUser } from '../../vuex/actions'

    export default {
        components:{ Profile, RepoItem },
        vuex: {
            getters: {
                profile: ({ userPage }) => userPage.profile,
                repos: ({ userPage }) => userPage.repos,
            },
            actions:{
                getRandomUser,
            }
        },
        route: {
            data() {
                this.$parent.$els.scrollsection.scrollTop = 0
                this.initData()
            }
        },
        methods:{
            initData(){
                const username = this.$route.params.username;
                if (username !== this.profile.login || !username) {
                    this.getRandomUser(username);
                }
                this.$dispatch('MOUNT_HEADER_CHANGE');
            }
        },
        transitions: {
            'lineup': {
                enterClass: 'fadeInUp',
                leaveClass: 'fadeOutRight'
            }
        }
    }
</script>

<style scoped>

</style>
