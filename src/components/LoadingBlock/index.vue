<template>
    <div id="loading-block"
         :class="{
            'one': one,
            'two': two,
            'three': three,
            'failed': failed
            }"
    ></div>
</template>

<script type="text/Babel">
    export default {
        data() {
            return {
                one: false,
                two: false,
                three: false,
                timer: null
            }
        },
        props: {
            'done': {},
            'failed': {
                default: false
            }
        },
        watch: {
            'done': function(val) {
                if (val) {
                    this.three = true;
                }
            },
            'failed': function(val) {
                if (val) {
                    this.failed = true;
                }
            }
        },
        attached() {
            this.timer = setTimeout(() => this.one = true, 17);
            this.timer = setTimeout(() => this.two = true, 500);
        },
        detached() {
            this.timer && clearTimeout(this.timer);
        }

    }
</script>