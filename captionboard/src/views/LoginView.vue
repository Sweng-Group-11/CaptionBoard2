<template>
  <div>
    <span v-if="loggedIn">
      {{ this.$router.replace({ name: "login" }) }}
    </span>

    <v-form @submit.prevent="pressed">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              type="email"
              label="Email"
              v-model="email"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-btn type="submit">Login</v-btn>
    </v-form>

    <div class="error" v-if="error">{{ error.message }}</div>

    <span
      >Need an account? Click here to
      <router-link to="/register">Register</router-link></span
    >
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  data() {
    return {
      show1: false,
      email: "",
      password: "",
      error: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async pressed() {
      try {
        const val = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        console.log(val);
        await this.$router.replace({ name: "dashboard" });
      } catch (err) {
        console.log(err);
      }
    },
    created() {
      firebase.auth().onAuthStateChanged((user) => {
        this.loggedIn = !!user;
      });
    },
  },
};
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