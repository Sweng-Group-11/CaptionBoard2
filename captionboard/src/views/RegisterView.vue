<template>
  <div class="text-center">
    <div v-if="error" class="error">{{ error.message }}</div>
    <form @submit.prevent="pressed">
      <div class="first_name">
        <input
          type="first_name"
          v-model="first_name"
          placeholder="First Name"
        />
      </div>
      <div class="surname">
        <input type="surname" v-model="surname" placeholder="Last Name" />
      </div>
      <div class="email">
        <input type="email" v-model="email" placeholder="Email Address" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="Password" />
      </div>
      <div type="User Type Select">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue" v-bind="attrs" v-on="on"> User Type </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-btn type="submit">Register</v-btn>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  methods: {
    async pressed() {
      try {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            firebase.auth().currentUser.updateProfile({
              displayName: this.first_name,
            });
          })
          .then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              first_name: this.first_name,
              surname: this.surname,
              user_type: "test"
            })
          })
          .then(() => {
            this.$router.replace({ name: "dashboard" });
          });
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      first_name: "",
      surname: "",
      items: [{ title: "Client" }, { title: "Freelancer" }],
    };
  },
};
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