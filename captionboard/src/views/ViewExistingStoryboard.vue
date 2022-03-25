<template>
<<<<<<< HEAD
  <v-card
    class="mx-auto"
    max-width="344"
  >
  
    <!-- Thumbnail Image-->
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Name of Storyboard
    </v-card-title>

    <v-card-subtitle>
      Company Name
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="blue lighten-2"
        text
      >
        View Storyboard
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

    <!--Quick Description -->
        <v-card-text>
            Quick Description of Storyboard
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
=======
    <div>
        <p> </p>
        <img id="dog" src="test" height="125px" width="200px"/>
        <h1>This image has been downloaded from the database.</h1>
        <p>(Proof of concept)</p>
    </div>
>>>>>>> main
</template>

<script>
<<<<<<< HEAD
  export default {
    data: () => ({
      show: false,
    }),
  }
</script>
=======
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export default {  

  methods: {
    async showImage() {
        const storageRef = firebase.storage().ref();
        storageRef.child('testing/dog.jpg').getDownloadURL().then(function(url) {
            const img = document.getElementById('dog');
            img.src = url;
        }).catch(function(error) {
            console.log(error)
        });
    }
  },

  beforeMount() {
      this.showImage()
  },

  data: () => {
    return {
    };
  },
};
</script>


<style scoped>

</style>
>>>>>>> main
