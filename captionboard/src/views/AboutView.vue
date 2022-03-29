
<template>
  <div class="about">
    ADAPT
    <div
              v-for="(image, imageIndex) in test[0]"
              :key="imageIndex"
            >
            <p>test[0]</p>
            <v-img :src="image" height="200px" width="200px"></v-img>
    </div>
    <div
              v-for="(image, imageIndex) in test[1]"
              :key="imageIndex"
            >
            <p>test[1]</p>
            <v-img :src="image" height="200px" width="200px"></v-img>
    </div>
    <p>{{ storyboardNames }}</p>
    <p>Test: {{ test }}</p>
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
      
      let storyboardNames = [];

      const storyboardsRef = firebase
        .firestore()
        .collection("users")
        .doc("testID")
        .collection("storyboard1");

      let storyboardRef;
      let imagesRef;
      let imageRef;
      let num_storyboards;
      let num_images;
      // let test = [];
      let imageURLs = [];
      let imageURL;

      storyboardsRef
        .doc("storyboard_names")
        .get()
        .then(function (names) {
          num_storyboards = names.get("num_storyboards");
          for (let i = 1; i <= num_storyboards; i++) {
            let num = i;
            let text = num.toString();
            let name = names.get(text);
            storyboardNames.push(name);

            storyboardRef = storyboardsRef.doc(name);
            storyboardRef.get().then(function (storyboard) {
              num_images = storyboard.get("num_images");
              imagesRef = storyboardRef.collection("images");
              imagesRef.get().then(() => {
                let storyboardImages = [];
                for (let i = 1; i <= num_images; i++) {
                  let num = i;
                  let text = num.toString();
                  imageRef = imagesRef.doc(text);

                  imageRef.get().then(function (image) {
                    imageURL = image.get("url");
                    storyboardImages.push(imageURL);
                  });
                }
                imageURLs.push(storyboardImages);
              });
            });
          }
        })
        .then(() => {
          this.storyboardNames = storyboardNames;
          this.test = imageURLs;
        });
    },
  },

  beforeMount() {
    this.populateStoryboards();
  },

  data: () => {
    return {
      imageRef: [],
      captions: [],
      test: [],
      storyboardNames: [],
    };
  },
};
</script>