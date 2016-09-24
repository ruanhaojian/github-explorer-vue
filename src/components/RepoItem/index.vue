<template>
    <a v-link="`/user/${this.repo.owner.login}/repos/${this.repo.name}`"
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
