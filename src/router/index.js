import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/main'
    }, {
        path: '/main',
        name: 'main',
        component: (resolve) => require(['../page/main.vue'], resolve),
        redirect: '/main/myLog',
        children: [{
            path: 'myLog',
            name: 'myLog',
            component: (resolve) => require(['../page/myLog/index.vue'], resolve)
        }, {
            path: 'questionButton/:id/title/:title',
            name: 'questionButton',
            component: (resolve) => require(['../page/questionAnswer/button.vue'], resolve)
        }, {
            path: 'questionAnswer/:id/title/:title',
            name: 'questionAnswer',
            component: (resolve) => require(['../page/questionAnswer/index.vue'], resolve)
        }, {
            path: 'myAttendance',
            name: 'myAttendance',
            component: (resolve) => require(['../page/myAttendance/index.vue'], resolve)
        }, {
            path: 'myLeave',
            name: 'myLeave',
            component: (resolve) => require(['../page/myLeave/index.vue'], resolve)
        }, {
            path: 'logEditor',
            name: 'logEditor',
            component: (resolve) => require(['../page/myLog/editorLog.vue'], resolve)
        }, {
            path: 'myTest',
            name: 'myTest',
            component: (resolve) => require(['../page/myTest/index.vue'], resolve)
        }, {
            path: 'testList',
            name: 'testList',
            component: (resolve) => require(['../page/myTest/testList.vue'], resolve)
        }, {
            path: 'testResult',
            name: 'testResult',
            component: (resolve) => require(['../page/myTest/testResult.vue'], resolve)
        }, {
            path: 'testResultList',
            name: 'testResultList',
            component: (resolve) => require(['../page/myTest/testResultList.vue'], resolve)
        }, {
            path: 'inExam',
            name: 'inExam',
            component: (resolve) => require(['../page/myTest/inExam.vue'], resolve)
        }, {
            path: 'lottery',
            name: 'lottery',
            component: (resolve) => require(['../page/lottery/index.vue'], resolve)
        }, {
            path: 'testWebp',
            name: 'testWebp',
            component: (resolve) => require(['../page/testComponent/testWebp.vue'], resolve)
        }]
    }, {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['../page/login.vue'], resolve)
    }]
})
