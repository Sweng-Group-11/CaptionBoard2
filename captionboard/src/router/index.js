// JavaScript file detailing the routr details for the app, which allows the different
// views of the app to communicate with one another.

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import RegisterView from '../views/RegisterView.vue'
import ViewExistingCaptions from '../views/ViewExistingCaptions.vue'
import ViewExistingStoryboard from '../views/ViewExistingStoryboard.vue'
import AccountSettings from '../views/AccountSettings.vue'
import AddNewStoryboard from '../views/AddNewStoryboard.vue'
import CaptionStoryboards from '../views/CaptionStoryboards.vue'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

Vue.use(VueRouter)

//defines all the different routes so that we can link to them from any view/components
const routes = [
  {
    //default page, set as login for now but maybe we need a dedicated home page?
    path: '/',
    name: 'landingPage',
    component: HomeView
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
    path: '/home',
    name: 'home',
    component: HomeView
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
  },
  {
    path: '/existingCaptions',
    name: 'existingCaptions',
    component: ViewExistingCaptions,
    meta: {
      requiresFreelancer: true,
      requiresAuth: true
    }
  },
  {
    path: '/existingStoryboard',
    name: 'existingStoryboard',
    component: ViewExistingStoryboard,
    meta: {
      requiresAdmin: true,
      requiresAuth: true
    }
  },
  {
    path: '/accountSettings',
    name: 'accountSettings',
    component: AccountSettings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addNewStoryboard',
    name: 'addNewStoryboard',
    component: AddNewStoryboard,
    meta: {
      requiresAdmin: true,
      requiresAuth: true
    }
  },
  {
    path: '/captionStoryboards',
    name: 'captionStoryboards',
    component: CaptionStoryboards,
    meta: {
      requiresFreelancer: true,
      requiresAuth: true
    }
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

  if (requiresAuth && !currentUser) {
    next('/')
  }
  else next()
})

export default router