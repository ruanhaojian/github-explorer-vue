<template>
    <div id='user-page'>

        <Profile
                :username="profile.login"
                :profile="profile"
        ></Profile>

        <div class='repo-list'>
            <div class='repo-list-header'>POPULAR REPOSITORIES</div>
            <div>

            </div>
        </div>
        <a
                v-link="`/user/${this.profile.login}/repos`"
                class='view-all-btn'
        >
        VIEW ALL REPOS
        </a>
    </div>
</template>

<script type="text/Babel">
    import Profile from '../Profile/index.vue'
    import { getRandomUser } from '../../vuex/actions'

    export default {
        components:{ Profile },
        vuex: {
            getters: {
                profile: ({ userPage }) => userPage.profile,
                repos: ({ userPage }) => userPage.repos,
            },
            actions:{
                getRandomUser,
            }
        },
        created(){
            console.log('====>created')
        },
        ready(){
            console.log('====>ready')

        },
        route: {
            data() {
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
        }
    }
</script>

<style scoped>

</style>
