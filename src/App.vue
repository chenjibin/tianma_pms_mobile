<template>
    <div id="app">
        <div class="fs-main-router-wrapper">
            <transition
                name="fade"
                mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="less">
    .mu-radio-wrapper {
        height: auto !important;
        line-height: 1.5;
    }
    .mu-radio-icon {
        position: inherit !important;
    }
    /*.mu-radio-ripple-wrapper {*/
        /*top: 50% !important;*/
        /*transform: translateY(-50%);*/
    /*}*/
    body, html {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .fs-square-img {
        position: relative;
        padding-top: 100%;
        width: 100%;
        img {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            width: 100%;
        }
    }

    .fs-dialog {
        border-radius: 26px !important;
        .fs-dialog-body {
            padding: 0;
        }
    }

    #app {
        position: relative;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
        width: 100%;
        overflow: hidden;
        .fs-main-router-wrapper {
            height: 100%;
            width: 100%;
            overflow: hidden;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
    }
</style>
