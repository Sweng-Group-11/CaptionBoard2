<template>
  <v-app>
    <v-main>
      <top-header></top-header>
      <navBarFreelancer></navBarFreelancer>
      <navBarAdmin></navBarAdmin>
    </v-main>
  </v-app>
</template>

<script>
import TopHeader from "./components/TopHeader.vue";
import navBarFreelancer from "./components/NavbarFreelancer.vue";
import navBarAdmin from "./components/NavbarAdmin.vue";
export default {
  components: {'top-header': TopHeader, 'navBarFreelancer': navBarFreelancer, 'navBarAdmin': navBarAdmin},
  data: () => ({
 
  }),
};
</script>

<style lang="scss" scoped>
</style>