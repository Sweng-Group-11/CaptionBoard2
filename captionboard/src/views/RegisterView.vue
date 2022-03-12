<template>
  <div class="text-center">
    <div v-if="error" class="error">{{ error.message }}</div>
    <form @submit.prevent="pressed">
      <fieldset class = "register-form" style="font-family: 'Ubuntu', sans-serif;">
        <span
          style="
            font-size: 40px;
            text-justify: 15px;
            color: white;
            font-family: 'Ubuntu', sans-serif;
            
          "
          >CaptionBoard Register</span
        >
      <div class="first_name">
        <label
            for="first-name"
            style="
              display: block;
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
            "
            >First Name</label
          >
        <input
          type="first_name"
          v-model="first_name"
        />
      </div>
      <div class="surname">
        <label
            for="surname"
            style="
              display: block;
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
            "
            >Last Name</label
          >
        <input type="surname" v-model="surname" />
      </div>
      <div class="email">
        <label
            for="email"
            style="
              display: block;
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
            "
            >Email</label
          >
        <input type="email" v-model="email" />
      </div>
      <div class="password">
        <label
            for="password"
            style="
              display: block;
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
            "
            >Password</label
          >
        <input type="password" v-model="password" />
      </div>
      <!-- Drop down menu to select user type -->
      <div type="User Type Select">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <button class="userType" v-bind="attrs" v-on="on"> User Type </button>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              v-model="user_type"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <button class="registerButton" type = "submit" v-btn color="black white--text" >Register</button>
      <span style="color: rgb(255, 255, 255);"
          >Already have an account? Click here to
          <router-link to="/login" style="color: rgb(235, 242, 250)"
            >Log in</router-link
          >
        </span>
      </fieldset>
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
      items: [{ title: "Client" }, { title: "Freelancer" }],
      user_type: "",
    };
  },
};
</script>

<style lang="scss" scoped>

.register-form {
  background-color: rgb(0, 89, 128);
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: 350px;
  width: 40%;
  margin-left: 50%;
  margin-top: 2%;
  transform: translate(-50%, 0);
  border-radius: 5px;
  border-width: 0px;
  box-shadow: 3px 3px 0px rgb(196, 196, 196);
}
input {
  max-width: 300px;
  width: 100%;
  padding: 10px;
  margin-top: 3px;
  margin-bottom: 5px;
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

.userType{
  margin-left: 50%;
  transform: translate(-50%, 0);
  max-width: 300px;
  width: 80%;
  padding: 15px, 15px, 15px, 15px;
  margin-bottom: 15px;
  margin-top: 15px;
  height: 40px;
  background-color: rgb(255, 255, 255);
}

.registerButton{
  margin-left: 50%;
  transform: translate(-50%, 0);
  max-width: 300px;
  width: 80%;
  padding: 15px, 15px, 15px, 15px;
  margin-bottom: 15px;
  margin-top: 15px;
  height: 40px;
  background-color: rgb(0, 38, 60);
  color: rgb(255, 255, 255);

}
.error {
  color: red;
}
</style>