<template>
    <div>
      <fieldset class="banner" style="font-family: 'Ubuntu', sans-serif;">
         <span style="display:inline-block; margin-left: 1%; color: rgb(255, 255, 255); font-size: 60px; margin-bottom: 10px;">CaptionBoard</span>
        <span v-if="loggedIn">
          <button type="button" @click="signOut" class="signIn">Sign Out</button>
        </span>
        <span v-else>
          <button type="button" @click="register" class="signIn">Login</button>
        </span>
        </fieldset>
    </div>
</template>

<script>
    import firebase from "firebase/compat/app";
    import "firebase/compat/auth";
    export default {
        created() {
            firebase.auth().onAuthStateChanged(user=> {
                this.loggedIn = !!user;
            })
        },
        data() {
            return {
                loggedIn: false
            }
        },
        methods: {
            async signOut() {
              try {
                const data = await firebase.auth().signOut();
                console.log(data);
                await this.$router.replace({name: "login"})
              } catch (err) {
                console.log(err)
              }
            },
            async register() {
              await this.$router.replace({name: "login"})
            }
        }
    }
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
.signIn{
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

.banner{
  border: 0;
  background-color: rgb(0, 38, 60);
}
</style>