<template>
<div
    style="text-align: center; color: white; font-family: 'Ubuntu', sans-serif;"
  >
  <div class = "hello">
    <div class ="name">
      <IonPage>

    <ion-content :fullscreen="true" id="start">

      <div class = "letter">
        <img src ="../assets/captionboard_logo_words_colour_outline copy.png">
        <h1>Welcome to CaptionBoard, Login to continue</h1>
          <router-link to="/login" style="color: black"
            >login</router-link
          >
      </div>
</ion-content>

  </IonPage>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Home-page',
  components:{}
};
</script>
