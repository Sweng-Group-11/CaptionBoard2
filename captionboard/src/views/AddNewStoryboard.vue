<template>
  <v-card flat>
    <!-- Success Popup after regiterting -->
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
            srequired>
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

          <!-- Favourite Animal Drop Down 
          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="form.favoriteAnimal"
              :items="animals"
              :rules="rules.animal"
              color="pink"
              label="Favorite animal"
              required
            ></v-select>
          </v-col>
-->

          <!-- Slider for Time (was Age)-->
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

      <!-- Cancel and Submit Storyboard (was register)-->
      <v-card-actions>
        <v-btn text @click="resetForm"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="primary" type="submit">
          Submit Storyboard
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
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
        description: [(val) => (val || "").length > 0 || "This field is required"]
      },
      animals: ["Dog", "Cat", "Rabbit", "Turtle", "Snake"],
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
        //   this.form.favoriteAnimal &&
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
