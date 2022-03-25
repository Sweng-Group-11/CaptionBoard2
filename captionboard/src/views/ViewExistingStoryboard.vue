<template>
    <div>

        <div>
        <p> </p>
        <img id="dog" src="test" height="125px" width="200px"/>
        <h1>This image has been downloaded from the database.</h1>
        <p>(Proof of concept)</p>    
        </div>
      
        <!-- <div id="photo-grid">
          <photo-grid
            :box-height="'400px'"
            :box-width="'30%'"
            <img v-for="image in "
          >
          </photo-grid>
      </div> -->

    </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import PhotoGrid from 'vue-photo-grid'

Vue.use(PhotoGrid);

export default {  

  methods: {
    // async showImage() {
    //     const storageRef = firebase.storage().ref();
    //     storageRef.child('testing/dog.jpg').getDownloadURL().then(function(url) {
    //         const img = document.getElementById('dog');
    //         img.src = url;
    //     }).catch(function(error) {
    //         console.log(error)
    //     });
    // },

    async showStoryboard() {


      const storageRef = firebase.storage().ref("storyboards/user1/storyboard1");
      storageRef.listAll().then(function(result) {
        result.items.forEach(function(image) {
          image.getDownloadURL().then(function(url) {
            this.imageURLs.push(url)
          })
        });
      }).catch(function(error) {
        console.log(error)
      });

      this.imageURLs.forEach(function(image) {
        var img = document.createElement('img');
        img.src = image;
        document.body.appendChild(img);
      });
      
      // function displayImage(image) {
      //   image.getDownloadURL().then(function(url) {
      //     const img = document.getElementById('dog');
      //     img.src = url;
      //   }).catch(function(error) {
      //     console.log(error)
      //   });
      // }
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