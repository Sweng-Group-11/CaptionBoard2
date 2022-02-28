<template>
  <v-app>
    <v-main>
      <router-view/>
      <router-link to="/home">Home </router-link>
      <router-link to="/about">About </router-link>
      <router-link to="/login">Login </router-link>
      <router-link to="/secret">Secret </router-link>
      <router-link to="/register">Register </router-link>
    </v-main>
  </v-app>
</template>

<script>
import RegisterView from './views/RegisterView.vue';

export default {
  name: 'App',

  data: () => ({
  
    RegisterView  //
  }),
};
</script>
