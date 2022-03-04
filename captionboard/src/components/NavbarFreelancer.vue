<template>
      <div id = "nav">
        <fieldset class="navBarFreelancer">
        <router-link to="/dashboard">
        <button class="userDashboardButton">User Dashboard</button>
        </router-link>
        </fieldset>
      </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.userDashboardButton{
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

.navBarFreelancer{
  border: 0px;
  background-color: rgb(0, 89, 128);
}
</style>