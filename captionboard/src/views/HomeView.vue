<template>
  <div
    style="text-align: center; color: black; font-family: 'Ubuntu', sans-serif"
  >
    <div class="hello">
      <div class="name">
        <IonPage>
          <ion-content :fullscreen="true" id="start">
            <div class="letter">
              <img
                src="../assets/captionboard_logo_words_colour_outline copy.png"
              />
              <h1>Welcome to CaptionBoard, Login to continue</h1>
            </div>
          </ion-content>
        </IonPage>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  name: "Home-page",
  components: {},

  methods: {
    async checkLoginStatus() {
      if (firebase.auth().currentUser != null) {
        this.$router.replace({ name: "dashboard" });
      }
    },
  },

  beforeMount() {
    this.checkLoginStatus();
  },
};
</script>
