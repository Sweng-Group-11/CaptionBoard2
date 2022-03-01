<template>
    <div style="text-align:center; color: white">
        <span v-if="loggedIn">
            {{ this.$router.replace({name: "login"}) }}
        </span>
        <form @submit.prevent="pressed">
        <fieldset class="login-form">
            <span style="font-size:25px; text-justify: 15px; font-family: Georgia">CaptionBoard Log-In</span>
            <div class="login">
                <label for="email" style="padding: 0px">Email</label>
                <input type="email" id="email" v-model="email" onclick="fnChangeBorder">
            </div>
            <div class="password">
                <label for="password" style="padding: 0px;">Password</label>
                <input type="password" v-model="password">
            </div>
            <v-btn type="submit" class="loginButton">Login</v-btn>
            <span>Need an account? Click here to <router-link to="/register" style="color: rgb(235, 242, 250)">Register</router-link></span>
            </fieldset>
        </form>
        <div class="error" v-if="error">{{error.message}}</div>
    </div>
</template>

<script>
    import firebase from "firebase/compat/app";
    import "firebase/compat/auth";
    export default {
        data () {
            return {
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {
            async pressed() {
                try {
                    const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                    console.log(val)
                    await this.$router.replace({name: "dashboard"})
                } catch(err) {
                    console.log(err)
                }
            },
            created() {
            firebase.auth().onAuthStateChanged(user=> {
                this.loggedIn = !!user;
            })
        },
        }
    }
</script>

<style lang="scss" scoped>
.loginButton {
    margin-left: 50%;
    transform: translate(-50%, 0);
    max-width: 300px;
    width: 80%;
    padding: 15px
}
.login-form {
    background-color: rgb(103, 148, 54);
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    max-width: 350px;
    width: 40%;
    margin-left: 50%;
    transform: translate(-50%, 0);
    border-radius: 10px;
}

input {
    --topBottomMargin: 15px;
    max-width: 300px;
    width: 100%;
    padding: 10px;
    margin-top: var(--topBottomMargin);
    margin-bottom: var(--topBottomMargin);
    margin-left: 50%;
    font-size: 21px;
    text-align: center;
    transform: translate(-50%, 0);
    border-style: solid;
    border-radius: 5px;
    border-color: rgb(201, 201, 201);
    outline-color: rgb(86, 132, 175);
    background-color: rgb(255, 255, 255);
}
.error {
    color: red;
}

</style>