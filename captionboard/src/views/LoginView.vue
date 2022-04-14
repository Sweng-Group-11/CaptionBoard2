// This is the page that allows users to login to the app.

<template>
<div style="text-align: center; color: white; font-family: 'Ubuntu', sans-serif">
    <form @submit.prevent="pressed">
        <fieldset class="login-form">
            <span style="
            font-size: 40px;
            text-justify: 15px;
            font-family: 'Ubuntu', sans-serif;
          ">CaptionBoard Login</span>
            <div class="login">
                <label for="email" style="
              display: block;
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
            ">Email</label>
                <input type="email" id="email" v-model="email" />
            </div>
            <div class="password">
                <label for="password" style="
              display: block;
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
            ">Password</label>
                <input type="password" v-model="password" />
            </div>
            <button type="submit" class="loginButton">Login</button>
            <span>Need an account? Click here to
                <router-link to="/register" style="color: rgb(235, 242, 250)">Register</router-link>
            </span>
        </fieldset>
    </form>
    <div class="error" v-if="error">{{ error.message }}</div>
</div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
    data() {
        return {
            email: "",
            password: "",
            error: "",
            loggedIn: false,
        };
    },

    mounted() {
        this.$nextTick(this.checkLoggedIn);
    },

    beforeUpdate() {
        this.$nextTick(this.checkLoggedIn);
    },

    updated() {
        this.$nextTick(this.checkLoggedIn);
    },

    methods: {
        // method preventing submission unless firebase authenticates the login details
        async pressed() {
            try {
                const val = await firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password);
                console.log(val);
                await this.$router.replace({
                    name: "dashboard"
                });
            } catch (err) {
                console.log(err);
            }
        },
        async checkLoggedIn() {
            if (firebase.auth().currentUser != null) {
                await this.$router.replace({
                    name: "dashboard"
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");

.loginButton {
    margin-left: 50%;
    transform: translate(-50%, 0);
    max-width: 300px;
    width: 80%;
    padding: 15px, 15px, 15px, 15px;
    margin-bottom: 15px;
    margin-top: 15px;
    height: 40px;
    background-color: rgb(0, 38, 60);
}

.login-form {
    background-color: rgb(0, 89, 128);
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    max-width: 350px;
    width: 40%;
    margin-left: 50%;
    margin-top: 7%;
    transform: translate(-50%, 0);
    border-radius: 5px;
    border-width: 0px;
    box-shadow: 3px 3px 0px rgb(196, 196, 196);
}

input {
    max-width: 300px;
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    margin-left: 50%;
    font-size: 15px;
    text-align: center;
    transform: translate(-50%, 0);
    border: none;
    border-bottom: 3px solid #0a6cc7;
    border-color: rgb(0, 126, 167);
    outline: 0;
    background-color: rgb(255, 255, 255);
    height: 50px;
}

input:focus {
    border-color: rgb(119, 168, 201);
}

.error {
    color: red;
}
</style>
