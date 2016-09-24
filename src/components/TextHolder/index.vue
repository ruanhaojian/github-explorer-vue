<template>
    <span
        :class="classObj"
        :style="styleObj"
    >
        <div class="text-holder" v-if="!content" ></div>
        <template v-else>{{content}}</template>
    </span>
</template>

<script type="text/Babel">

    export default {
        props : ['width', 'height', 'center', 'content'],
        computed: {
            classObj() {
                return {
                    'text-holder-wrapper': this.content === undefined,
                    center: this.center
                }
            },
            styleObj() {
                if (!this.content) {
                    return {
                        width: this.width,
                        height: this.height
                    }
                } else {
                    return null
                }
            }
        },

    }
</script>

<style scoped>

</style>
