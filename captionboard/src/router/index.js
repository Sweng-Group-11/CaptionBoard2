import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import RegisterView from '../views/RegisterView.vue'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

Vue.use(VueRouter)

//defines all the different routes so that we can link to them from any view/components
const routes = [
  {
    //default page, set as login for now but maybe we need a dedicated home page?
    path: '/',
    name: 'landingPage',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    //this meta tag allows the security rule below, only logged in users can view dashboard
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

//defines the router used for jumping between pages
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//router guard blocking access to any page with the requiresAuth meta tag unless they are a logged in user
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser)
  {
    next('/')
  }
  else next()
})

export default router
