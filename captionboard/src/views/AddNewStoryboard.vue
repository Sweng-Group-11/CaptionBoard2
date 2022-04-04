// This view allows an Admin to add a new storyboard.

<template>
<v-card flat>
  <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Storyboard Succesfully Uploaded!</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>
<v-form ref="form" @submit.prevent="submit">
<div class="allInputs">
  <div class="leftInputFields" id="leftColumn">
    <div class="titleField">
      <p style="
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
              font-size: 30px;
              display: inline-flex;
              margin-right: 6%;
              vertical-align:top;
              float:left;
            ">Title</p>
        <input class="titleInput" v-model="form.storyboardName" :rules="rules.name" required />
    </div>
    <div class="titleField">
      <p style="
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
              font-size: 30px;
              display: inline-flex;
              float:left;
              margin-right: 6%;
              vertical-align:top;
            ">Company</p>
        <input class="titleInput" v-model="form.companyName" :rules="rules.name" required/>
    </div>
    <div class="descriptionField">
      <p style="
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
              font-size: 30px;
              display: inline-flex;
              margin-right: 6%;
              text-align:left;
              vertical-align:top;
            ">Description</p>
        <textarea rows="4" class="descriptionInput" v-model="form.description" :rules="rules.description" required/>
    </div>
  </div>
  <div class="vl">
  </div>
  <div class="rightInputFields">
    <div class="imageDuration">
      <p style="
              padding-top: 10px;
              color: rgb(255, 255, 255);
              text-align: left;
              font-size: 30px;
              display: inline-flex;
              float:left;
              margin-right: 6%;
              vertical-align:top;
            ">Image Duration</p>
      <input type="range" min="1" max="30" value="15" 
      id="imageSliderValue" v-model="form.time" :rules="rules.time" class="imageDurationSlider" oninput="this.nextElementSibling.value = this.value" @change="getSliderVal">
      <output class="valueBox">15</output>
    </div>
    <div class="consentBoxes"> 
      <div class="checkboxLabel">
      <label for="uploadedAllImages" style="white-space: nowrap;">
      <input type="checkbox" class="consetCheckbox" id="uploadedAllImages" v-model="form.terms">
      Confirm all images are selected for Storyboard.
      </label>
      </div>
      <div class="uploadSubmitButtons">
        <v-btn class="addImages" @click="onPickFile"> Upload Images Here </v-btn>
            <input type="file" id="myFile" style="display: none;" ref="fileInput" accept="images/*" @change="onFilePicked" multiple/>
        <v-btn :disabled="!formIsValid" type="submit" @click="onUpload" class="submit">
          Submit Storyboard
        </v-btn>
      </div>
    </div>
  </div>
</div>
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
      time: null,
      terms: false,
    });

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        time: [],
        name: [(val) => (val || "").length > 0 || "This field is required"],
        description: [
          (val) => (val || "").length > 0 || "This field is required",
        ],
      },
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

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");

.leftInputFields{
  text-align: center; 
  color: white; 
  font-family: 'Ubuntu', sans-serif; 
  display: inline-flex; 
  vertical-align:top;
  flex-direction: column;
  width: 50%;
}
.titleField{
  background-color: rgb(0, 38, 60);
  margin-left: 2%;
  padding: 1%;
  padding-top: 1%;
  width: 92%;
  margin-top: 2%;
  border-radius: 4px;
  display: inline;
}

.titleInput{
  width: 70%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 20px;
  border: none;
  border-bottom: 3px solid #0a6cc7;
  border-color: rgb(0, 126, 167);
  outline: 0;
  background-color: rgb(255, 255, 255);
  height: 50px;
  float: right;
  margin-right: 2%;
}

.descriptionField{
  background-color: rgb(0, 38, 60);
  margin-left: 2%;
  padding: 1%;
  padding-top: 2%;
  padding-bottom: 2%;
  width: 92%;
  margin-top: 2%;
  border-radius: 4px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
}

.descriptionInput{
  width: 70%;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-bottom: 3px solid #0a6cc7;
  border-color: rgb(0, 126, 167);
  outline: 0;
  background-color: rgb(255, 255, 255);
  height: 100% !important;
  display: inline-flex;
  margin-right: 2%;
}

.vl {
  border-right: 6px solid rgb(200, 200, 200);
  height: 500px;
  width: 6px;
  display: inline-flex;
}

.rightInputFields{
  display: inline-flex;
  margin-left: 2%;
  vertical-align: top;
  width: 45%;
  text-align: center; 
  color: white; 
  font-family: 'Ubuntu', sans-serif; 
  vertical-align:top;
  flex-direction: column;
}

.imageDuration{
  background-color: rgb(0, 38, 60);
  margin-left: 2%;
  padding: 1%;
  padding-top: 1%;
  width: 100%;
  margin-top: 2%;
  border-radius: 4px;
  display: inline-flex !important;
  padding-bottom: 1%;
  vertical-align: middle;
}
.imageDurationSlider{
  display: inline-flex;
  -webkit-appearance: none;
  appearance: none;
  height: 50%;
  background:rgb(255, 255, 255);
  transform: translate(0, 50%);
  margin-right: 2%;
  flex: 0 1 55%;
  justify-content: flex-end;
}

.imageDurationSlider::-webkit-slider-thumb {
  -webkit-appearance: none; 
  appearance: none;
  width: 5%;
  height: 35px; 
  background: rgb(0, 89, 128); 
  cursor: pointer; 
}

.valueBox{
  display: inline-flex;
  height: 50%;
  background:rgb(255, 255, 255);
  width: 5%;
  margin-right: 2%;
  transform: translate(0, 50%);
  color: black;
  text-align: center;
  line-height: 200%;
  padding-left: 1%
}

.consentBoxes{
  background-color: rgb(0, 38, 60);
  margin-left: 2%;
  padding: 1%;
  padding-top: 1%;
  width: 100%;
  margin-top: 2%;
  border-radius: 4px;
  display: inline-flex;
  flex-direction: column;
}

.checkboxLabel{
  display: inline-flex;
  flex-direction: row;
  width: 100%;
}
.consetCheckbox{
  display: inline-flex;
  margin-left: 2%;
  margin-top: 2%;
}

.uploadSubmitButtons{
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.addImages{
  margin-left: 2%;
  max-width: 300px;
  width: 40%;
  padding: 15px, 15px, 15px, 15px;
  margin-bottom: 15px;
  margin-top: 15px;
  height: 40px;
  background-color: rgb(0, 89, 128);
}
.submit{
  margin-right: 1%;
  max-width: 300px;
  width: 40%;
  padding: 15px, 15px, 15px, 15px;
  margin-bottom: 15px;
  margin-top: 15px;
  height: 40px;
  background-color: rgb(0, 89, 128);
}

.allInputs{
  display: inline-flex;
  width: 100%;
}
</style>