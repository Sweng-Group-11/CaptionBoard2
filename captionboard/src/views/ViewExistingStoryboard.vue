<template>
  <div>
    <v-spacer></v-spacer>

    <h1>The below images have been downloaded from a sample Storyboard.</h1>

    <div v-for="(image, imageIndex) in imageURLs" :key="imageIndex">
      <img :src="image" width="20%" height="auto" />
    </div>

  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  methods: {

    async databaseStoryboard() {
      const imageURLs = [];

      firebase
        .firestore()
        .collection("users")
        .doc("testID")
        .collection("storyboard1")
        .doc("storyboard1")
        .get()
        .then(function (storyboard) {
          const num_images = storyboard.get("num_images");

          for (let i = 1; i <= num_images; i++) {
            let num = i;
            let text = num.toString();
            let url = storyboard.get(text);
            imageURLs.push(url);
          }
        })
        .then(() => {
          this.imageURLs = imageURLs;
        })
    },
  },

  beforeMount() {
    this.databaseStoryboard();
  },

  data: () => {
    return {
      imageURLs: [],
    };
  },
};
</script>


<style scoped>
</style>
