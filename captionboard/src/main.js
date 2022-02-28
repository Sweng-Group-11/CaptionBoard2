import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";
import firebase from "firebase/compat/app"

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

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

  let app;

  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if(!app) {
      app = new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount('#app')
    }
  })
