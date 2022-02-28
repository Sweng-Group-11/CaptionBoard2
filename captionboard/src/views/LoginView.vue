<template>
    <div>
        <form @submit.prevent="pressed">
            <div class="login">
                <input type="email" placeholder="email" v-model="email">
            </div>
            <div class="password">
                <input type="password" placeholder="password" v-model="password">
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
            }
        }
    }
</script>

<style lang="scss" scoped>

input {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
}

.error {
    color: red;
}

</style>