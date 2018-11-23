// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import request from './utils/request'
import MuseUI from 'muse-ui'
import fastclick from 'fastclick'
import VConsole from 'vconsole'
import 'muse-ui/dist/muse-ui.css'
import 'animate.css'

// fastclick.attach(document.body)
// if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-unused-vars */
    // const vConsole = new VConsole()
// }

Vue.use(MuseUI)
Vue.config.productionTip = false

Vue.prototype.$http = request

router.beforeEach((to, from, next) => {
    if (to.name === 'questionButton') {
        store.commit('setStoreUrl', to.fullPath)
    }
    if (to.path !== '/login') {
        request.get('/user/myUserInfo').then((res) => {
            if (res.success) {
                next()
            } else {
                next('/login')
            }
        })
    } else {
        next()
    }
})

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})
