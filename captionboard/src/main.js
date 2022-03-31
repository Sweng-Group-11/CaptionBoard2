// This JavaScript page is responsible for importing plugins and also tying the frontend to
// the backend on Firebase. Do not delete anything on this page.

// import any plugins that we use in the project here
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/storage"

//part of vue setup
Vue.config.productionTip = false

//linking project with Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAhEY6A8oycV9Wnvhutj3NRhC2QcMu6I30",
    authDomain: "captionboard-1fa4f.firebaseapp.com",
    databaseURL: "https://captionboard-1fa4f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "captionboard-1fa4f",
    storageBucket: "captionboard-1fa4f.appspot.com",
    messagingSenderId: "1003797594334",
    appId: "1:1003797594334:web:42c3005cecff9f4bb5824f",
    measurementId: "G-VBLBBX1CFB"
};
firebase.initializeApp(firebaseConfig);

//defines app which gets called in public/index.html, basically the starting point of the app
let app;
firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if (!app) {
        app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        }).$mount('#app')
    }
})
