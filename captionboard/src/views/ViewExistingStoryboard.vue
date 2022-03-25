<template>
  <div>
    <v-spacer></v-spacer>

    <h1>The below images have been downloaded from a sample Storyboard.</h1>

    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header> {{ storyboardName }} </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <div v-for="(image, imageIndex) in imageURLs" :key="imageIndex">
              <img :src="image" width="20%" height="auto" />
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
    // async getStoryboardNames() {
    //   const storageRef = firebase
    //     .storage()
    //     .ref("storyboards/user1/");
    //   storageRef
    //     .listAll()
    //     .then(function (result) {
    //       result.prefixes.forEach(function (name) {
    //         this.storyboardName = name
    //       })
    //     })
    // }
  },

  beforeMount() {
    this.showStoryboard();
    this.getStoryboardNames();
  },

  data: () => {
    return {
      imageURLs: [],
      storyboardName: "Storyboard Name"
    };
  },
};
</script>


<style scoped>
</style>
