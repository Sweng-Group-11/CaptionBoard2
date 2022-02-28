<template>
  <v-app>
    <v-main>
      <top-header></top-header>
      <h1>Welcome to CaptionBoard</h1>
      <div id = "nav">
        <router-link to="/about">About </router-link>
        <router-link to="/login">Login </router-link>
        <router-link to="/secret">Secret </router-link>
        <router-link to="/register">Register </router-link>
      </div>
      <router-view/>
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