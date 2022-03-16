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

      <!--  Below tag calls whatever view is set as home page '/' in router/index.js and allows for routing between the views/components. -->
      <!--  Seems to be causing the bug that makes every page repeat itself, leaving commented for now as we might need it. -->
      <router-view :key="$route.path"></router-view>

    </v-main>
  </v-app>
</template>

<script>
// imports the component so it can be instantiated above
import TopHeader from "./components/TopHeader.vue";
import navBarFreelancer from "./components/NavbarFreelancer.vue";
import navBarAdmin from "./components/NavbarAdmin.vue";

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
  },

  methods: {
    async profileType() {
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

  mounted() {
    this.$nextTick(this.profileType);
  },

  beforeUpdate() {
    this.profileType();
  },

  updated() {
    this.profileType();
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