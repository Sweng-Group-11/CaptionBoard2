<template>
  <div>
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="(name, nameIndex) in storyboardNames"
        :key="nameIndex"
      >
        <v-expansion-panel-header>{{ name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>Company name:</div>
          <div>Description: {{ storyboardDescs[nameIndex] }}</div>
          <div
            v-for="(image, imageIndex) in imageRefs[nameIndex]"
            :key="imageIndex"
          >
            <v-card class="mx-auto" max-width="30%">
             
              <v-img :src="image" height="auto"></v-img>

              <v-card-actions>
                <div class="blue--text">
                  <v-form>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Insert caption here"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </div>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
      const storyboardRefs = firebase.firestore().collection("storyboards");

      const namesRef = firebase
        .firestore()
        .collection("storyboards")
        .doc("storyboard_names");

      const storyboardNames = [];
      const storyboardDescs = [];
      const imageRefs = [];
      const test = [];

      namesRef
        .get()
        .then(function (names) {
          const num_storyboards = names.get("num_storyboards");
          for (let i = 1; i <= num_storyboards; i++) {
            let num = i.toString();
            let name = names.get(num);
            storyboardNames.push(name);
            storyboardRefs
              .doc(name)
              .get()
              .then(function (storyboard) {
                const num_images = storyboard.get("num_images");
                test.push(num_images);
                const images = [];
                storyboardDescs.push(storyboard.get("storyboard_description"));

                for (let j = 1; j <= num_images; j++) {
                  const imagesRef = storyboardRefs
                    .doc(name)
                    .collection("images");
                  let num = j.toString();
                  imagesRef
                    .doc(num)
                    .get()
                    .then(function (image) {
                      let url = image.get("url");
                      images.push(url);
                    });
                }
                imageRefs.push(images);
              });
          }
        })
        .then(() => {
          this.test = test;
        })
        .then(() => {
          this.storyboardNames = storyboardNames;
        })
        .then(() => {
          this.storyboardDescs = storyboardDescs;
        })
        .then(() => {
          this.imageRefs = imageRefs;
        });
    },
  },

  beforeMount() {
    this.populateStoryboards();
  },

  data: () => {
    return {
      storyboardNames: [],
      imageRefs: [],
      storyboardDescs: [],
      test: [],
    };
  },
};
</script>

<style scoped>
</style>
