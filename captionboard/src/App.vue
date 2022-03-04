<template>
  <v-app>
    <v-main>
      <!-- Below tag instantiates the header component -->
      <top-header></top-header>
      <!-- NavBar mostly for testing, probably won't keep? -->
      <div id="nav">
        <fieldset class="navBar">
          <router-link to="/dashboard">
            <button class="userButton">User Dashboard</button>
          </router-link>
        </fieldset>
      </div>
      <!-- Below tag calls whatever view is set as home page '/' in router/index.js -->
      <router-view :key="$route.path"></router-view>
    </v-main>
  </v-app>
</template>

<script>
// imports the component so it can be instantiated above
import TopHeader from "./components/TopHeader.vue";
export default {
  // takes the TopHeader component and assigns it a variable name for instantiation in the template
  components: { "top-header": TopHeader },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.userButton {
  margin-left: 0%;
  max-width: 150px;
  width: 80%;
  padding: 15px, 15px, 15px, 15px;
  height: 40px;
  background-color: rgb(0, 89, 128);
  color: white;
  border-right: 1px solid;
  border-color: white;
}

.navBar {
  border: 0px;
  background-color: rgb(0, 89, 128);
}
</style>