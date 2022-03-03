<template>
  <v-app>
    <v-main>
      <top-header></top-header>
      <div id = "nav">
        <router-link to="/dashboard">User Dashboard</router-link>
      </div>
      <router-view :key="$route.path"></router-view>
      <login-comp></login-comp>
    </v-main>
  </v-app>
</template>

<script>
import TopHeader from "./components/TopHeader.vue"
export default {
  components: {'top-header': TopHeader},
  data: () => ({
 
  }),
};
</script>