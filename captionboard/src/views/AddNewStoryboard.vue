// This view allows an Admin to add a new storyboard.

<template>
  <!-- <v-card flat>
  
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
            <v-btn> Upload Images Here </v-btn>
            <v-checkbox v-model="form.terms" color="green">
              <template v-slot:label>
                <div @click.stop="">
                  Confirm all images are selected for Storyboard.
                </div>
              </template>
            </v-checkbox>
          </v-col>

          
          <v-col cols="12" sm="6">
            <v-slider
              v-model="form.time"
              :rules="rules.time"
              color="orange"
              label="Set timer for each image"
              min="1"
              max="30"
              thumb-label
            ></v-slider>
          </v-col>
        </v-row>
      </v-container>

      
      <v-card-actions>
        <v-btn text @click="resetForm"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="primary" type="submit">
          Submit Storyboard
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card> -->
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
        <input class="titleInput" v-model="storyboardName" required/>
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
        <input class="titleInput" v-model="companyName" required/>
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
        <textarea rows="4" class="descriptionInput" v-model="description" required/>
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
      id="imageSliderValue" v-model="form.time" class="imageDurationSlider" oninput="this.nextElementSibling.value = this.value">
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
        <button type="button" class="addImages">Add Images</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
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
    submit() {
      this.snackbar = true;
      this.resetForm();
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
  width: 80%;
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
  width: 80%;
  margin-top: 2%;
  border-radius: 4px;
  display: inline-flex;
  flex-direction: row;
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
}
.addImages{
  margin-left: 2%;
  max-width: 300px;
  width: 30%;
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