/**
 * Created by kingsae1004@gmail.com on 01/06/2019
 */
import Vue from 'vue'
import Router from 'vue-router'
import MainView from '../view/MainView'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {
                name: "MainView"
            }
        },
        {
            path: '/',
            name: 'MainView',
            component: MainView
        }
    ]
})
