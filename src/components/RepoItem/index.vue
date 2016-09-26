<template>
    <!--`/user/${this.repo.owner.login}/repos/${this.repo.name}`-->
    <a v-link="{name: 'REPO_DETAIL' , params: { username: this.repo.owner.login, repoName: this.repo.name }}"
       class="repo-item"
    >
        <repo-content :repo="repo"></repo-content>
    </a>
</template>

<script type="text/Babel">

    import RepoContent from '../RepoContent/index.vue'

    export default {
        props: ['repo'],
        components: {
            RepoContent
        }
    }
</script>

<style scoped>

</style>
