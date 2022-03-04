<template>
  <v-app>
    <v-main>
      <!-- Below tag instantiates the header component -->
      <top-header></top-header>
      <navBarFreelancer></navBarFreelancer>
      <!-- Below tag calls whatever view is set as home page '/' in router/index.js -->
      <router-view :key="$route.path"></router-view>
    </v-main>
  </v-app>
</template>

<script>
// imports the component so it can be instantiated above
import TopHeader from "./components/TopHeader.vue";
import navBarFreelancer from "./components/NavbarFreelancer.vue";
export default {
  // takes components and assigns them variable names for instantiation in the template
  components: {'top-header': TopHeader, 'navBarFreelancer': navBarFreelancer},
  data: () => ({
 
  }),
};
</script>

<style lang="scss" scoped>
</style>