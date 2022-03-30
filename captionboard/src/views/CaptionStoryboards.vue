<template>
  <div>
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="(name, nameIndex) in storyboardNames"
        :key="nameIndex"
        v-model="storyboard_name"
      >
        <v-expansion-panel-header>{{ name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>Company name:</div>
          <div>Description: {{ storyboardDescs[nameIndex] }}</div>
          <div
            v-for="(image, imageIndex) in imageRefs[nameIndex]"
            :key="imageIndex"
          >
            <v-card class="mx-auto" max-width="250">
              <v-img :src="image" height="auto"></v-img>
              <p></p>
              <v-card-actions>
                <div class="blue--text">
                  <form>
                    <v-text-field
                      v-model="caption"
                      :error-messages="captionErrors"
                      :counter="100"
                      label="Enter caption here"
                      required
                      @input="$v.caption.$touch()"
                      @blur="$v.caption.$touch()"
                    ></v-text-field>

                    <v-btn class="mr-4" @click="submit"> submit </v-btn>
                    <v-btn @click="clear"> clear </v-btn>
                  </form>
                  <p>{{ test }}</p>
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
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    caption: { required, maxLength: maxLength(100) },
  },

  computed: {
    captionErrors() {
      const errors = [];
      if (!this.$v.caption.$dirty) return errors;
      !this.$v.caption.maxLength &&
        errors.push("caption must be at most 100 characters long");
      !this.$v.caption.required && errors.push("caption is required.");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.caption != "") {
        const caption = this.caption;
        const name = this.storyboard_name;

        alert(name);
        this.test = this.caption;
        const numRef = firebase
        .firestore()
        .collection("users")
        .doc("testID")
        .collection("captions")
        .doc("num_captions");

      numRef.get().then(function (number) {
        let num_captions = number.get("num");
        num_captions++;
        numRef.set({
          num: num_captions,
        });

        const num = num_captions.toString();

        firebase
          .firestore()
          .collection("users")
          .doc("testID")
          .collection("captions")
          .doc(num)
          .set({
            caption: caption,
            admin_id: "testID",

          });
      });
      }

      
    },
    clear() {
      this.$v.$reset();
      this.caption = "";
    },
    async populateStoryboards() {
      const storyboardRefs = firebase.firestore().collection("storyboards");

      const namesRef = firebase
        .firestore()
        .collection("storyboards")
        .doc("storyboard_names");

      const storyboardNames = [];
      const storyboardDescs = [];
      const imageRefs = [];

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
      caption: "",
      test: "empty",
      storyboard_name: "",
    };
  },
};
</script>

<style scoped>
</style>
