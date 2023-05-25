import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import homeComp from './components/homePage.vue'
import signUpComp from './components/signUpPage.vue'
import loginComp from './components/loginPage.vue'
import landingComp from './components/landingPage.vue'
import adminComp from './components/adminPage.vue'

const routes: Array<RouteRecordRaw> = [
    {
        name:'homePage',
        path:'/',
        component: homeComp
    },
    {
        name:'signUpPage',
        path:'/signup',
        component: signUpComp
    },
    {
        name:'loginPage',
        path:'/login',
        component: loginComp
    },
    {
        name:'landingPage',
        path:'/landingpage',
        component: landingComp
    },
    {
        name:'adminPage',
        path:'/adminpage',
        component: adminComp
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  export default router