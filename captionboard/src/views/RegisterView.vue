<template>
  <div class="text-center">
    <div v-if="error" class="error">{{ error.message }}</div>
    <form @submit.prevent="pressed">
      <div class="first_name">
        <input
          type="first_name"
          v-model="first_name"
          placeholder="First Name"
          required
        />
      </div>
      <div class="surname">
        <input type="surname" v-model="surname" placeholder="Last Name"  required/>
      </div>
      <div class="email">
        <input type="email" v-model="email" placeholder="Email Address" required/>
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="Password" required/>
      </div>
      <!-- Drop down menu to select user type -->
      <!-- Actually returns the index of the user's selection, so 0 for Admin and 1 for Freelancer. -->
      <div type="User Type Select">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue" v-bind="attrs" v-on="on"> User Type </v-btn>
          </template>
          <v-list >
            <v-list-item-group v-model="user_type" required>
              <v-list-item v-for="(item, index) in items" :key="index" :rules="'Required'">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
      <v-btn type="submit">Register</v-btn>
    </form>
  </div>
</template>

<script>
//required packages for user authentication and using the database
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  methods: {
    async pressed() {
      if(this.user_type == "")
      {
        alert("Please fully fill out the form.")
      }
      else{
        try {
        //function to create the user and authenticate via firebase
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            firebase.auth().currentUser.updateProfile({
              displayName: this.first_name,
            });
          })
          // function to store the user in the database
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                first_name: this.first_name,
                surname: this.surname,
                user_type: this.user_type,
              });
          })
          //sends the user to the dashboard view
          .then(() => {
            this.$router.replace({ name: "dashboard" });
          });
        //logs the user and any errors in the console for debugging (F12 to open console on Firefox)
        console.log(user);
      } catch (err) {
        console.log(err);
      }
      }
    },
  },
  //initialising data to be used in this view
  data() {
    return {
      email: "",
      password: "",
      error: "",
      first_name: "",
      surname: "",
      items: [{ title: "Admin" }, { title: "Freelancer" }],
      user_type: "",
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