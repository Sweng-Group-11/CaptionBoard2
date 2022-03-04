<template>
  <v-app>
    <v-main>
      <top-header></top-header>
      <div id = "nav">
        <fieldset class="navBar">
        <router-link to="/dashboard">
        <button class="userButton">User Dashboard</button>
        </router-link>
        </fieldset>
      </div>
      <router-view :key="$route.path"></router-view>
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

<style lang="scss" scoped>
.userButton{
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

.navBar{
  border: 0px;
  background-color: rgb(0, 89, 128);
}
</style>