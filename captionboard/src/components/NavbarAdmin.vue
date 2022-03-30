// NavBar component that is only displayed when the current user is an Admin.

<template>
  <v-main>
    <div id="nav">
      <fieldset class="navBarAdmin">
        <router-link to="/dashboard">
          <button class="navbarButton">User Dashboard</button>
        </router-link>
        <router-link to="/existingStoryboard">
          <button class="navbarButton">View Existing Storyboards</button>
        </router-link>
        <router-link to="/addNewStoryboard">
          <button class="navbarButton">Add New Storyboards</button>
        </router-link>
        <router-link to="/accountSettings">
          <button class="navbarButton">Account Settings</button>
        </router-link>
        <router-link to="/about">
          <button class="navbarButton">About Us</button>
        </router-link>
      </fieldset>
    </div>
  </v-main>
</template>

<script>
</script>

<style lang="scss" scoped>
.navbarButton {
  max-width: 200px;
  width: 20%;
  padding: 15px, 15px, 15px, 15px;
  height: 40px;
  background-color: rgb(0, 89, 128);
  color: white;
  border-right: 1px solid;
  border-color: white;
}

.navBarAdmin {
  border: 0px;
  background-color: rgb(0, 89, 128);
}
</style>