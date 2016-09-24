<template lang="html">
    <div id="search-input">
        <button
                :class="buttontext ? '' : 'icon'"
                @click="search"
        >{{ buttontext }} <i class="fa fa-search" v-if="!buttontext"></i>
        </button>
        <input
                aria-label="Search"
                type="search"
                :placeholder="placeholder"
                v-model="searchtext"
                @focus="this.$dispatch('focus');"
        />
    </div>
</template>

<script type="text/Babel">
    export default {
        props: ['buttontext', 'placeholder', 'searchtext'],
        methods: {
            search() {
                this.$dispatch('search');
            },
        },
        watch: {
            'searchtext': function (newVal, oldVal) {

                if(newVal){
                    this.searchTimeout && clearTimeout(this.searchTimeout)

                    this.searchTimeout = setTimeout(() => {
                        this.search()
                    },1500)
                }

            }
        }
    }
</script>