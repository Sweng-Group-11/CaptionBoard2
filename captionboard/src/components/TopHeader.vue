<template>
  <div>
    <fieldset class="banner" style="font-family: 'Ubuntu', sans-serif">
      <span
        style="
          display: inline-block;
          margin-left: 1%;
          color: rgb(255, 255, 255);
          font-size: 60px;
          margin-bottom: 10px;
        "
        >CaptionBoard</span
      >
      <img src="../assets/captionboard_logo_no_words_colour_outline copy.png" style="width: 80px; margin-top: 5px; position:absolute">
      <!-- login status is determined by the created() method below -->
      <span v-if="loggedIn">
        <button type="button" @click="signOut" class="signIn">Sign Out</button>
      </span>
      <span v-else>
        <button type="button" @click="login" class="signIn">Login</button>
      </span>
    </fieldset>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  //polls whether the users has successfully logged in or out
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.loggedIn = !!user;
    });
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    // calls firebase function to sign out and redirects to login page, but could be home?
    async signOut() {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
        await this.$router.replace({ name: "login" });
      } catch (err) {
        console.log(err);
      }
    },
    // just redirects to login page
    async login() {
      await this.$router.replace({ name: "login" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");
.signIn {
  transform: translate(-10%, 70%);
  max-width: 300px;
  width: 15%;
  margin-bottom: 30px;
  height: 40px;
  background-color: rgb(0, 89, 128);
  color: white;
  display: inline;
  max-width: 200px;
  float: right;
}

.banner {
  border: 0;
  background-color: rgb(0, 38, 60);
}
</style>