<template>
    <div id="user">Hello {{ username }}</div>
</template>

<script>
 import firebase from "firebase/compat/app";
 import "firebase/compat/auth";

  export default {
    data () {
      return {
        username: firebase.auth().currentUser.email,
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>