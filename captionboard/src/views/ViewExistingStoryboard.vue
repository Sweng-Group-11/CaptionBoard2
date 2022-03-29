<template>
  <div>
    <v-spacer></v-spacer>

    <h1>
      The below images have been successfully downloaded from the backend
      database.
    </h1>

    <div>
      <v-expansion-panels accordion>
        <v-expansion-panel
          v-for="(name, nameIndex) in storyboardNames"
          :key="nameIndex"
          max-width="50%"
        >
          <v-expansion-panel-header>{{ name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>{{ storyboardDescs[nameIndex] }}</p>
            <div
              v-for="(image, imageIndex) in imageRefs[nameIndex]"
              :key="imageIndex"
            >
              <v-card class="mx-auto" max-width="20%">
                <!-- Thumbnail Image-->
                <v-img :src="image" height="auto"></v-img>

                <v-card-actions>
                  <div class="blue--text">Captions for this Image</div>

                  <v-btn icon @click="show = !show">
                    <v-icon>
                      {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
                    </v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <div
                      v-for="(caption, captionIndex) in captions[nameIndex][
                        imageIndex
                      ]"
                      :key="captionIndex"
                    >
                      {{ captionIndex + 1 }} {{ caption }}
                    </div>
                  </div>
                </v-expand-transition>
              </v-card>
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
      const storyboardDescs = [];
      const allCaptions = [];

      const namesRef = firebase
        .firestore()
        .collection("users")
        .doc("testID")
        .collection("storyboard1")
        .doc("storyboard_names");

      const storyboardsRef = firebase
        .firestore()
        .collection("users")
        .doc("testID")
        .collection("storyboard1");

      let i, j, k;

      namesRef
        .get()
        .then(function (names) {
          const num_storyboards = names.get("num_storyboards");

          for (i = 1; i <= num_storyboards; i++) {
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
                storyboardDescs.push(storyboard.get("storyboard_description"));
                const storyboardCaptions = [];

                for (j = 1; j <= num_images; j++) {
                  const imagesRef = storyboardsRef
                    .doc(name)
                    .collection("images");
                  let num = j;
                  let text = num.toString();
                  imagesRef
                    .doc(text)
                    .get()
                    .then(function (image) {
                      let url = image.get("url");
                      images.push(url);
                    });
                  // let url = storyboard.get(text);
                  // images.push(url);
                  const captionsRef = storyboardsRef
                    .doc(name)
                    .collection("images")
                    .doc(text)
                    .collection("captions");
                  captionsRef
                    .doc("num_captions")
                    .get()
                    .then(function (num) {
                      const num_captions = num.get("num");
                      const imageCaptions = [];
                      for (k = 1; k <= num_captions; k++) {
                        let num = k;
                        let text = num.toString();
                        captionsRef
                          .doc(text)
                          .get()
                          .then(function (captions) {
                            let caption = captions.get("caption");
                            imageCaptions.push(caption);
                          });
                      }
                      storyboardCaptions.push(imageCaptions);
                    });
                }
                allCaptions.push(storyboardCaptions);
                imageRefs.push(images);
              });
          }
        })
        .then(() => {
          this.storyboardNames = storyboardNames;
        })
        .then(() => {
          this.imageRefs = imageRefs;
        })
        .then(() => {
          this.storyboardDescs = storyboardDescs;
        })
        .then(() => {
          this.captions = allCaptions;
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
      captions: [],
      show: false,
      test: [],
    };
  },
};
</script>


<style scoped>
</style>
