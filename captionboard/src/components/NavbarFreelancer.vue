<template>
  <div id="nav">
    <fieldset class="navBarFreelancer">
      <router-link to="/dashboard">
        <button class="navbarButton">User Dashboard</button>
      </router-link>
      <router-link to="/existingCaptions">
        <button class="navbarButton">View Existing Captions</button>
      </router-link>
      <router-link to="/captionStoryboards">
        <button class="navbarButton">Add New Captions</button>
      </router-link>
      <router-link to="/accountSettings">
        <button class="navbarButton">Account Settings</button>
      </router-link>
      <router-link to="/about">
        <button class="navbarButton">About Us</button>
      </router-link>
    </fieldset>
  </div>
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

.navBarFreelancer {
  border: 0px;
  background-color: rgb(0, 89, 128);
}
</style>