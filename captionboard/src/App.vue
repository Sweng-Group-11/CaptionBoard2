// This is the main app that essentially allows the entire app to run. It is responsible for routing
// and displaying all of the pages and also the components on the page.

<template>
  <v-app>
    <v-main>
      <!-- Instantiate the TopHeader component -->
      <top-header></top-header>

      <!-- Check user type and only display the correct Nav Bar. -->
      <span v-if="isAdmin">
        <navBarAdmin></navBarAdmin>
      </span>
      <span v-else-if="isFreelancer">
        <navBarFreelancer></navBarFreelancer>
      </span>
      <span v-else>
        <navBarGeneral></navBarGeneral>
      </span>

      <!--  The below line is required to display the other views of the page. The app will not work
            without it and if it is repeated anywhere then the pages will also repeat. -->
      <router-view :key="$route.path"></router-view>
    </v-main>
  </v-app>
</template>

<script>
// imports the component so it can be instantiated above
import TopHeader from "./components/TopHeader.vue";
import navBarFreelancer from "./components/NavbarFreelancer.vue";
import navBarAdmin from "./components/NavbarAdmin.vue";
import NavbarGeneral from "./components/NavbarGeneral.vue";

// imports required firebase libraries
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  // takes components and assigns them variable names for instantiation in the template
  components: {
    "top-header": TopHeader,
    navBarFreelancer: navBarFreelancer,
    navBarAdmin: navBarAdmin,
    navBarGeneral: NavbarGeneral
},

  methods: {
    async profileType() {
      if (firebase.auth().currentUser == null) {
        this.isAdmin = false;
        this.isFreelancer = false;
      } else
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((ds) => {
            if (ds.get("user_type") == 0) {
              this.isAdmin = true;
              this.isFreelancer = false;
            } else if (ds.get("user_type") == 1) {
              this.isAdmin = false;
              this.isFreelancer = true;
            } else {
              alert("");
            }
          });
    },
  },

  beforeMount() {
    this.profileType();
  },

  mounted() {
    this.$nextTick(this.profileType);
  },

  beforeUpdate() {
    this.$nextTick(this.profileType);
  },

  updated() {
    this.$nextTick(this.profileType);
  },

  data: () => {
    return {
      isAdmin: false,
      isFreelancer: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");
.function_call {
  color: rgb(255, 255, 255);
}
</style>