// I've been using this page to test various things, don't worry about deleting any of it
// because none of it is important. -Wes

<template>
  <div class="about">
    {{ getUserType() }}
    <p>{{ user_type }}</p>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  methods: {
    async getUserType() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((ds) => {
          this.user_type = ds.get("test2");
          console.log("Test:", ds.data());
          console.log("User Type: ", this.user_type);
          console.log("ds: ", ds);
        });
    },
  },

  data() {
    return {
      user_type: "no",
    };
  },
};
</script>