// I just used the text below to test the user database, most of it can be safely deleted. 
// This page should be a landing page for the user when they sign in.

<template>
  <div id="user">
    <h1>Hello {{ username }}</h1>
    <p>Hello {{ uid }}</p>
    <p></p>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  data() {
    return {
      username: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>