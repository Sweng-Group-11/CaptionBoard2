<template>
    <div>
        <img id="dog" src="test" height="125px" width="200px"/>
    </div>
</template>

<script>
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