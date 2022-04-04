// Page that displays the current user's account information and also allows the 
// user to edit that information or even delete their account.

<template>
  <div id="user">
    <p>Username: {{ username }}</p>

    <p>Email: ciandoyle251@gmail.com</p>

    <p>Usertype: Freelancer</p>
  </div>
  <!-- Same Process as above ^ just need Usertype to display if 
        user is an admin or freelancer, -->
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
  methods: {
    getUserType(){
      //firebase.auth().currentUser
    }
  }

};
</script>


<style lang="scss" scoped>
</style>