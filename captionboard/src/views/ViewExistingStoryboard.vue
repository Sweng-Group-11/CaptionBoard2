<template>
  <div>
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header> Storyboard Name </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="blue--text">Description:</div>

          <v-card max-width="344">
            <!-- Thumbnail Image-->
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-actions>
              <div class="blue--text">Captions for this Image</div>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  This will be a list of all captions for this image
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>

          <!-- Insert Images -->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <p></p>
    <img id="dog" src="test" height="125px" width="200px" />
    <h1>This image has been downloaded from the database.</h1>
    <p>(Proof of concept)</p>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export default {
  methods: {
    async showImage() {
      const storageRef = firebase.storage().ref();
      storageRef
        .child("testing/dog.jpg")
        .getDownloadURL()
        .then(function (url) {
          const img = document.getElementById("dog");
          img.src = url;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  beforeMount() {
    this.showImage();
  },

  data: () => ({
    show: false,
  }),
};
</script>


<style scoped>
</style>
