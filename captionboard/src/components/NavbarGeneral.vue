<template>
    <v-main>
      <div id = "nav">
        <fieldset class="navBarGeneral">
        <router-link to="/">
        <button class="navbarButton">Home Page</button>
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
.navbarButton{
    max-width: 200px;
    width: 20%;
    padding: 15px, 15px, 15px, 15px;
    height: 40px;
    background-color: rgb(0, 89, 128);
    color: white;
    border-right: 1px solid;
    border-color: white;
}

.navBarGeneral{
  border: 0px;
  background-color: rgb(0, 89, 128);
}
</style>