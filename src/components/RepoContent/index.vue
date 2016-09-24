<template lang="html">
    <div class="repo-content">
        <div class="repo-title">
            <text-holder
                    width="150px"
                    height="23px"
                    :content="repo.name"
            ></text-holder>
        </div>
        <div class="repo-desc">
            <text-holder
                    width="260px"
                    height="21px"
                    :content="repo.description"
            ></text-holder>
        </div>
        <div class="repo-date">
            <text-holder
                    width="80px"
                    height="12px"
                    :content="repo.updated_at | fromNow"
            ></text-holder>
        </div>
        <div class="repo-info">
            <div class="repo-language">
                <text-holder
                        width="100px"
                        height="15px"
                        :content="repo.language"
                ></text-holder>
            </div>
            <div class="repo-stats">
                <i class="fa fa-eye"></i> {{repo.watchers_count}}
                <i class="fa fa-star"></i> {{repo.stargazers_count}}
                <i class="fa fa-code-fork"></i> {{repo.forks}}
            </div>
        </div>
    </div>
</template>

<script>
    import TextHolder from '../TextHolder/index.vue';
    import moment from 'moment';
    export default {
        props: ['repo'],
        components: {
            TextHolder
        },
        filters: {
            fromNow(date) {
                return `Updated at ${moment(date).fromNow()}`;
            }
        }
    }
</script>

<style >


</style>
