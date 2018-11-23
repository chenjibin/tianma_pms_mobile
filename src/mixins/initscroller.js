export default {
    methods: {
        resizeScroll() {
            this.$nextTick(function() {
                this.height = this.$el.clientHeight - 56 + 'px'
            })
        }
    }
}
