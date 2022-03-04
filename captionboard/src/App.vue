<template>
  <v-app>
    <v-main>
      <top-header></top-header>
      <navBarFreelancer></navBarFreelancer>
    </v-main>
  </v-app>
</template>

<script>
import TopHeader from "./components/TopHeader.vue";
import navBarFreelancer from "./components/NavbarFreelancer.vue";
export default {
  components: {'top-header': TopHeader, 'navBarFreelancer': navBarFreelancer},
  data: () => ({
 
  }),
};
</script>

<style lang="scss" scoped>
</style>