<template>
    <div>
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
            <div class="first_name">
                <input type="first_name" v-model="first_name" placeholder="First Name">
            </div>
            <div class="surname">
                <input type="surname" v-model="surname" placeholder="Last Name">
            </div>
            <div class="email">
                <input type="email" v-model="email" placeholder="email">
            </div>
            <div class="password">
                <input type="password" v-model="password" placeholder="password"> 
            </div>
            <v-btn type="submit">Register</v-btn>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase/compat/app";
    import "firebase/compat/auth";
    export default {
        methods: {
            async pressed(){
                try{
                    const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        firebase.auth().currentUser.updateProfile({
                            displayName: this.first_name
                        })
                    })
                    console.log(user)
                }catch(err){
                    console.log(err)
                }
                alert('Submitted')
              await this.$router.replace({name: "dashboard"});
            }
        },
        data () {
            return {
                email: '',
                password: '',
                error: '',
                first_name: '',
                surname: ''
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