<template>
    <div id='profile'>

        <div id='user-profile'>

            <Avatar
                    id="avatar"
                    :src="profile.avatar_url"></Avatar>

            <div id='user-info'>
                <div id='user-info-upper'>
                    <h1>
                        <text-holder
                                width="190px"
                                height="19px"
                                :content="profile.name || profile.login"
                        ></text-holder>
                    </h1>
                    <h2>
                        <text-holder
                                width="100px"
                                height="16px"
                                :content="profile.login || profile.name"
                        ></text-holder>
                    </h2>
                </div>
                <div id='user-info-lower'>
                    <div class='round-btn'>
                        Follow
                    </div>
                </div>
            </div>

        </div>

        <div id='user-bio'>
            <text-holder
                    width="200px"
                    height="20px"
                    :center="true"
                    :content="profile.bio"
            ></text-holder>
        </div>

        <div id='user-stats'>
            <div class='stats-divider space-holder' ></div>

            <div class='stats-block'>
                <div class='stats-title'>
                    <text-holder
                            width="40px"
                            height="20px"
                            :center="true"
                            :content="profile.followers"
                    ></text-holder>
                </div>
                <div class='stats-description'>Followers</div>
            </div>

            <div class='stats-divider' ></div>

            <div class='stats-block'>
                <div class='stats-title'>
                    <text-holder
                            width="40px"
                            height="20px"
                            :center="true"
                            :content="profile.public_repos"
                    ></text-holder>
                </div>
                <div class='stats-description'>Public repos</div>
            </div>

            <div class='stats-divider' ></div>

            <div class='stats-block'>
                <div class='stats-title'>
                    <text-holder
                            width="40px"
                            height="20px"
                            :center="true"
                            :content="profile.following"
                    ></text-holder>
                </div>
                <div class='stats-description'>Following</div>
            </div>

            <div class='stats-divider space-holder' ></div>
        </div>

        <div id='view-repos'>
            <a
                v-link="`/user/${this.username || this.profile.login}/repos`"
                class='green-btn'
            >VIEW REPOSITORIES</a>
        </div>

    </div>
</template>

<script type="text/Babel">

    import TextHolder from '../TextHolder/index.vue'
    import Avatar from '../Image/index.vue'

    export default {
        components:{ TextHolder, Avatar },
        props : [ 'username', 'profile' ]
    }
</script>

<style scoped>

</style>
