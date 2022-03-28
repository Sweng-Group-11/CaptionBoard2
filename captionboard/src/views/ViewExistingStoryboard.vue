<template>
  <div>
    <v-spacer></v-spacer>

    <h1>The below images have been successfully downloaded from the backend database.</h1>

    <div v-for="(name, nameIndex) in storyboardNames" :key="nameIndex">
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>{{ name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <div v-for="(image, imageIndex) in imageRefs[nameIndex]" :key="imageIndex">
                <p>{{imageIndex}}</p>
                <img :src="image" width="20%" height="auto" />
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
    async populateStoryboards() {
      const storyboardNames = [];
      const imageRefs = [];

      const namesRef = firebase
        .firestore()
        .collection("users")
        .doc("testID")
        .collection("storyboard1")
        .doc("storyboard_names")

      const storyboardsRef = firebase
        .firestore()
        .collection("users")
        .doc("testID")
        .collection("storyboard1")

      namesRef.get().then(function (names) {
        const num_storyboards = names.get("num_storyboards");

        for (let i = 1; i <= num_storyboards; i++) {
          let num = i;
          let text = num.toString();
          let name = names.get(text);
          storyboardNames.push(name);
          storyboardsRef
            .doc(name)
            .get()
            .then(function (storyboard) {
              const num_images = storyboard.get("num_images");
              const images = [];

              for (let j = 1; j <= num_images; j++) {
                let num = j;
                let text = num.toString();
                let url = storyboard.get(text);
                images.push(url);
              }

              imageRefs.push(images)
            });
        }
      })
      .then(() => {
        this.storyboardNames = storyboardNames;
      })
      .then(() => {
        this.imageRefs = imageRefs;
      })
    },
  },

  beforeMount() {
    this.populateStoryboards();
  },

  data: () => {
    return {
      imageURLs: [],
      storyboardNames: [],
      storyboardNames2: [],
      imageRefs: []
    };
  },
};
</script>


<style scoped>
</style>
