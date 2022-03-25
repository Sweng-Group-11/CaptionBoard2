<template>
  <div>
    <v-spacer></v-spacer>
    
    <v-card class="mx-auto" max-width="344">
      <!-- Thumbnail Image-->
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>

      <v-card-title> Name of Storyboard </v-card-title>

      <v-card-subtitle> Company Name </v-card-subtitle>

      <v-card-actions>
        <v-btn color="blue lighten-2" text> View Storyboard </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <!--Quick Description -->
          <v-card-text> Quick Description of Storyboard </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <div>
      
        <div v-for="(image, imageIndex) in imageURLs " :key="imageIndex">
          <img 
            :src="image"
            width="20%"
            height=auto
          />        
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

      const storageRef = firebase.storage().ref("storyboards/user1/storyboard1");
      storageRef.listAll().then(function(result) {
        result.items.forEach(function(image) {
          image.getDownloadURL().then(function(url) {
            imageURLs.push(url)
          })
        });
      }).catch(function(error) {
        console.log(error)
      }).then(() => {
        this.imageURLs = imageURLs;
      });
    }
  },
  

  beforeMount() {
      this.showStoryboard()
  },

  data: () => {
    return {
      imageURLs: []
    };
  },
};
</script>


<style scoped>
</style>
