import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import homeComp from './components/homePage.vue'
import signUpComp from './components/signUpPage.vue'
import loginComp from './components/loginPage.vue'
import landingComp from './components/landingPage.vue'
import adminDetailsComp from './components/adminDetailsPage.vue'
import currentBetsComp from './components/currentBets.vue'
import historyBetsComp from './components/bettingHistory.vue'
import userDetailsComp from './components/userDetailsPage.vue'
import adminLandingComp from './components/adminLandingPage.vue'

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
        name:'adminDetailsPage',
        path:'/admindetails',
        component: adminDetailsComp
    },
    {
        name: 'currentBetsPage',
        path:'/currentbets',
        component: currentBetsComp
    },
    {
        name: 'BetHistoryPage',
        path:'/bethistory',
        component: historyBetsComp
    },
    {
        name:'userDetailsPage',
        path:'/userdetails',
        component: userDetailsComp
    },
    {
        name:'adminLandingPage',
        path:'/adminlanding',
        component: adminLandingComp
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  export default router