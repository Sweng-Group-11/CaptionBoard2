// View that allows the Freelancer to caption any storyboard that has been uplaoded by any Admin.

<template>
  <div>
    <!-- The expansion panels are the drop down menus -->
    <v-expansion-panels accordion>
      <!-- The below for loop gets all the storyboard names and creates a new drop down menu for each storyboard -->
      <v-expansion-panel
        v-for="(name, nameIndex) in storyboardNames"
        :key="nameIndex"
      >
        <v-expansion-panel-header>{{ name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- The variables in curly brackets are arrays that are filled in the script tag. -->
          <div>Company name: {{ companyNames[nameIndex] }}</div>
          <div>Description: {{ storyboardDescs[nameIndex] }}</div>

          <!-- The for loop below takes the number of images calculated in the script and populates the drop down
          menu with all the images for the associated storyboard. -->
          <div
            v-for="(image, imageIndex) in imageRefs[nameIndex]"
            :key="imageIndex"
          >
            <v-card class="mx-auto" max-width="30%">
              <v-img :src="image" height="auto"></v-img>
              <p></p>
              <v-card-actions>
                <div class="blue--text">
                  <form>
                    <!-- Change 'counter' for the little number under the text-field, but this doesn't actually 
                    change the required length. That's changed in the script. The 'label' is what appears in the
                    blank box, and also above the text box when you are typing. -->
                    <v-text-field
                      v-model="caption"
                      :error-messages="captionErrors"
                      :counter="100"
                      label="Enter caption here"
                      required
                      @input="$v.caption.$touch()"
                      @blur="$v.caption.$touch()"
                    ></v-text-field>

                    <!-- Submit Button -->
                    <v-btn class="mr-4" @click="submit(name, imageIndex + 1)">
                      submit
                    </v-btn>

                    <!-- Clear Button -->
                    <v-btn @click="clear"> clear </v-btn>
                  </form>
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

<style scoped>
</style>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  // Change the value in maxLength() if you want longer/shorter captions to be allowed.
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
    submit(name, image) {
      this.$v.$touch();
      if (this.caption != "") {
        const caption = this.caption;
        let admin_id = "noID";

        const numRef = firebase
          .firestore()
          .collection("users")
          .doc("testID") // change to currentUser.uid when uploading is finished
          .collection("captions")
          .doc("num_captions");

        const storyboardRef = firebase
          .firestore()
          .collection("storyboards")
          .doc(name);

        storyboardRef
          .get()
          .then(function (storyboard) {
            admin_id = storyboard.get("admin_id");
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(admin_id) 
              .collection("storyboard1") //change to "storyboards" when uploading is finished
              .doc(name)
              .collection("images")
              .doc(image.toString())
              .collection("captions")
              .doc("num_captions")
              .get()
              .then(function (num) {
                let num_captions = num.get("num");

                num_captions++;
                firebase
                  .firestore()
                  .collection("users")
                  .doc(admin_id)
                  .collection("storyboard1") //change to "storyboards" when uploading is finished
                  .doc(name)
                  .collection("images")
                  .doc(image.toString())
                  .collection("captions")
                  .doc("num_captions")
                  .set({
                    num: num_captions,
                  });

                const numString = num_captions.toString();

                firebase
                  .firestore()
                  .collection("users")
                  .doc(admin_id)
                  .collection("storyboard1") //change to "storyboards" when uploading is finished
                  .doc(name)
                  .collection("images")
                  .doc(image.toString())
                  .collection("captions")
                  .doc(numString)
                  .set({
                    caption: caption,
                    selected: false,
                    uid: firebase.auth().currentUser.uid,
                  });
              });
          });

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
            .doc("testID") // set to currentUser.uid when uploading is finished
            .collection("captions")
            .doc(num)
            .set({
              caption: caption,
              admin_id: admin_id,
              picture: image,
              storyboard_name: name,
              selected: false,
            });
        });
        this.clear();
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
      const companyNames = [];

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
                companyNames.push(storyboard.get("company_name"));

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
        })
        .then(() => {
          this.companyNames = companyNames;
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
      companyNames: [],
    };
  },
};
</script>


