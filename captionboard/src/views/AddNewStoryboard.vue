// This view allows an Admin to add a new storyboard.

<template>
  <v-card flat>
    <!-- Success Popup after uploading a storyboard -->
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Storyboard Succesfully Uploaded!</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>

    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.storyboardName"
              :rules="rules.name"
              color="blue darken-2"
              label="Storyboard Name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.companyName"
              :rules="rules.name"
              color="blue darken-2"
              label="Company Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="form.description"
              :rules="rules.description"
              color="blue"
              srequired
            >
              <template v-slot:label>
                <div>
                  Description of Storyboard
                  <small>(theme, mood, language)</small>
                </div>
              </template>
            </v-textarea>
          </v-col>

          <v-col cols="12">
            <v-btn @click="onPickFile"> Upload Images Here </v-btn>
            <input type="file" id="myFile" style="display: none;" ref="fileInput" accept="images/*" @change="onFilePicked" multiple/>

            <v-checkbox v-model="form.terms" color="green" @change="checkBox">
              <template v-slot:label>
                <div @click.stop="">
                  Confirm all images are selected for Storyboard.
                </div>
              </template>
            </v-checkbox>
          </v-col>

          <!-- Slider for Time -->
          <v-col cols="12" sm="6">
            <v-slider
              v-model="form.time"
              :rules="rules.time"
              color="orange"
              label="Set timer for each image"
              min="1"
              max="30"
              thumb-label
              @change="getSliderVal"
            ></v-slider>
          </v-col>
        </v-row>
      </v-container>

      <!-- Cancel and Submit Storyboard (was register)-->
      <v-card-actions>
        <v-btn text @click="resetForm"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="primary" type="submit" @click="onUpload">
          Submit Storyboard
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
  import firebase from "firebase/compat/app"
  import "firebase/compat/storage"
  import { getStorage, ref, getDownloadURL } from "firebase/storage";
  import "firebase/compat/auth";
  //import { doc, getDoc } from "firebase/firestore";
export default {
  data() {
    const defaultForm = Object.freeze({
      storyboardName: "",
      companyName: "",
      description: "",
      favoriteAnimal: "",
      time: null,
      terms: false,
    });

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        time: [],
        animal: [(val) => (val || "").length > 0 || "This field is required"],
        name: [(val) => (val || "").length > 0 || "This field is required"],
        description: [
          (val) => (val || "").length > 0 || "This field is required",
        ],
      },
      animals: ["Dog", "Cat", "Rabbit", "Turtle", "Snake"],
      conditions: false,
      snackbar: false,
      terms: false,
      defaultForm,
      imageData: [],
      seconds_per_image: 0
      
    };
  },

  computed: {
    formIsValid() {
      return (
        this.form.storyboardName &&
        this.form.companyName &&
        this.form.description &&
        this.form.terms
      );
    },
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    getSliderVal(number){
      this.seconds_per_image = number
      console.log(this.seconds_per_image)
    },
    submit() {
      this.snackbar = true;
      this.resetForm();
    },
          onPickFile(){
        this.$refs.fileInput.click()
      },

      onFilePicked(event){
        const files = event.target.files
        this.imageData = files
      },


      changeThis(url){
        this.htmlURL = url
      },

      checkBox(){
        //console.log("checkbox is checked")
        this.puttingStorage()
      },

      //let holding = this.company_name
      // callingMeth(){
      //   firebase.firestore().collection("storyboards").get("storyboard_names").then((ds) =>{
      //     ds.docs.forEach(doc => {
      //       console.log(doc.id + " " + ds.size)
      //       if(doc.id == "storyboard_names"){
      //         console.log("found it")

      //         return("here")
      //       }
      //     })
      //   });
      // },

      async createMethod(){
        const exampleName = this.form.storyboardName
        firebase.firestore().collection("storyboards").get().then((ds) =>{
          //alert(ds.docs.length)
          let size = ds.docs.length
          firebase.firestore().collection("storyboards").doc("storyboard_names").update({
            [(size-1)]: exampleName,
            num_storyboards: size-1
          })
        });
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("storyboards").get().then((ds) =>{
          let size = ds.docs.length
          firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("storyboards").doc("storyboard_names").update({
            [(size-1)]: exampleName,
            num_storyboards: size-1
          })
        })
      },

      getURL(){
        const wo = this.form.storyboardName
        const storage = getStorage();
        const uid = firebase.auth().currentUser.uid
        firebase.firestore().collection("storyboards").doc(this.form.storyboardName)
        // const holding = firebase.firestore().collection("users").doc(uid).collection("storyboards").doc(wo).collection("images").doc("1")

        
        for(let i = 0; i < this.imageData.length; i++){
          // 's1mORuy3WBNrdzwVpp3n7Z7HTKX2/'

          const getting = this.imageData[i].name
          let ref2
          ref2 = ref(storage, 'storyboards/'+ uid +'/'+ wo +'/' + getting)

        //let uploadedFile = await firebase.storage().ref2.put(this.imageData[i].name)

          getDownloadURL(ref2)
          .then((outputURL) => {
            const holding = firebase.firestore().collection("users").doc(uid).collection("storyboards").doc(wo).collection("images").doc((i+1).toString())
            firebase.firestore().collection("storyboards").doc(wo).collection("images").doc((i+1).toString()).set({
              url: outputURL
            })
            holding.set({
              url: outputURL})
          })
          .catch((error) => {
            alert("output" + error)
          });
        }
      },
      async puttingStorage(){
        for(let i = 0; i < this.imageData.length; i++){
          firebase.storage().ref('storyboards/'+ firebase.auth().currentUser.uid + '/' + this.form.storyboardName + '/'+ this.imageData[i].name).put(this.imageData[i]);
        }
      },
      async onUpload(){
        //await this.puttingStorage().then(this.getURL())
        
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("storyboards").doc(this.form.storyboardName).set({
          company_name: this.form.companyName,
          num_images: this.imageData.length,
          seconds_per_image: this.seconds_per_image,
          storyboard_description: this.form.description,
          storyboard_name: this.form.storyboardName})
        
        firebase.firestore().collection("storyboards").doc(this.form.storyboardName).set({
          admin_id: firebase.auth().currentUser.uid,
          company_name: this.form.companyName,
          num_images: this.imageData.length,
          seconds_per_image: this.seconds_per_image,
          storyboard_description: this.form.description,
          storyboard_name: this.form.storyboardName
        })

        // for(let j = 1; j < this.imageData.length + 1; j++){
        //   let imgNum = j.toString()
        //   firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("storyboards").doc(this.form.storyboardName).collection("images").doc(imgNum).set({url: "fial"})
        //   //firebase.firestore().collection("storyboards").doc(this.form.storyboardName).collection("images").doc(imgNum).set({url: null})
        // }
        this.createMethod()
        this.getURL()
      },
    
  },
};
</script>
