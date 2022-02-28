<template>
  <v-app>
    <v-main>
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
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'App',
  components: HelloWorld,

  data: () => ({
 
  }),
};
</script>
