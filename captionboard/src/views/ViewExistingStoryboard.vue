<template>
  <div>
    <v-spacer></v-spacer>

    <h1>The below images have been downloaded from a sample Storyboard.</h1>

    <div>
      <div v-for="(image, imageIndex) in imageURLs" :key="imageIndex">
        <img :src="image" width="20%" height="auto" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export default {
  methods: {
    async showStoryboard() {
      const imageURLs = [];

      const storageRef = firebase
        .storage()
        .ref("storyboards/user1/storyboard1");
      storageRef
        .listAll()
        .then(function (result) {
          result.items.forEach(function (image) {
            image.getDownloadURL().then(function (url) {
              imageURLs.push(url);
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(() => {
          this.imageURLs = imageURLs;
        });
    },
  },

  beforeMount() {
    this.showStoryboard();
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
