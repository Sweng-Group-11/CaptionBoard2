<template>
    <div>
        <span v-if="loggedIn">
          <v-btn @click="signOut">Sign Out</v-btn>
        </span>
        <span v-else>
          <v-btn @click="register">Not Signed In</v-btn>
        </span>
        <div>
        </div>
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

</style>