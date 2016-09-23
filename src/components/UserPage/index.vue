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

    export default {
        components:{ Profile },
        vuex: {
            getters: {
                profile: {}
            },
            actions:{

            }
        },
        created(){

        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
