<template>
    <div>
        <span v-if="loggedIn">
            {{ this.$router.replace({name: "login"}) }}
        </span>

        <form @submit.prevent="pressed">
            <div class="login">
                <input type="email" placeholder="Email" v-model="email">
            </div>

            <div class="password">
                <v-row>
                    <v-col>
                        cols="4"
                        sm="6"
                        md="3"
                <input type="password" placeholder="Password" v-model="password">
            </div>
            <v-btn type="submit">Login</v-btn>
        </form>

        <div class="error" v-if="error">{{error.message}}</div>

        <span>Need an account? Click here to <router-link to="/register">Register</router-link></span>
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

input {
    max-width: 300px;
    width: 30%;
    padding: 10px;
    margin-left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 20px;
    text-align: center;
    font-size: 21px;
}

.error {
    color: red;
}

</style>