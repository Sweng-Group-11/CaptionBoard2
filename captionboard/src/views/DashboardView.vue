// I just used the text below to test the user database, most of it can be safely deleted. 
// This page should be a landing page for the user when they sign in.

<template>
  <div id="user">
    <fieldset class="introduction">
      <p style="font-size: 60px; text-align: center; color: rgb(106, 106, 106); font-weight: bold;">
          Hello {{ username }}
        </p>
        <p style="font-size: 40px; text-align: center;">Welcome to CaptionBoard</p>
        <img src="../assets/captionboard_example.png" style="min-width: 20%; width: 40%; margin-left: 50%; transform: translate(-50%, 0%); padding-bottom: 30px;">
        <p style="font-size: 40px; color: rgb(106, 106, 106);">
          Get Started
        </p>
      <span v-if="isAdmin">
        <p>As you are an admin, you have access to creating and editing storyboards. Click any of the links below to get started working with CaptionBoard.</p>
      <fieldset class="get-started">
      <div class="get-started-button">
      <p style="padding: 10px;">Create a New Storyboard</p>
      <img src="../assets/add_storyboard.png" style="width: 60%; margin-left: 50%; transform: translate(-50%, 0%);">
      <router-link to="/addNewStoryboard">
      <button class= "page-transfer">
        Click Here
      </button>
      </router-link>
    </div>
    <div class="get-started-button">
      <p>View Existing Storyboards</p>
      <img src="../assets/storyboard_existing.png" style="width: 60%; margin-left: 0%; margin-top: 0%; transform: translate(-50%, 40%); position:absolute;">
      <router-link to="/existingStoryboard">
      <button class= "page-transfer">
        Click Here
      </button>
      </router-link>
    </div>
    <div class="get-started-button">
      <p>Account <br> Settings</p>
      <img src="../assets/gear.png" style="width: 60%; margin-left: 50%; transform: translate(-50%, 0%);">
      <router-link to="/accountSettings">
      <button class= "page-transfer">
        Click Here
      </button>
      </router-link>
    </div>
    </fieldset>
      </span>
      <span v-else-if="isFreelancer">
        <p>As you are a freelancer, you have access to adding captions. Click any of the links below to get started working with CaptionBoard.</p>
      <fieldset class="get-started">
      <div class="get-started-button">
      <p style="padding: 10px;">Add New Captions</p>
      <img src="../assets/add_storyboard.png" style="width: 60%; margin-left: 50%; transform: translate(-50%, 0%);">
      <router-link to="/captionStoryboards">
      <button class= "page-transfer">
        Click Here
      </button>
      </router-link>
    </div>
    <div class="get-started-button">
      <p>View Existing Captions</p>
      <img src="../assets/storyboard_existing.png" style="width: 60%; margin-left: 0%; margin-top: 0%; transform: translate(-50%, 40%); position:absolute;">
      <router-link to="/existingCaptions">
      <button class= "page-transfer">
        Click Here
      </button>
      </router-link>
    </div>
    <div class="get-started-button">
      <p>Account <br> Settings</p>
      <img src="../assets/gear.png" style="width: 60%; margin-left: 50%; transform: translate(-50%, 0%);">
      <router-link to="/accountSettings">
      <button class= "page-transfer">
        Click Here
      </button>
      </router-link>
    </div>
    </fieldset>
      </span>
      </fieldset>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  methods: {

  async profileType() {

      if(firebase.auth().currentUser == null)
      {
        this.isAdmin = false;
        this.isFreelancer = false;
      }
      else
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((ds) => {
          if (ds.get("user_type") == 0) {
            this.isAdmin = true;
            this.isFreelancer = false;
          } else if (ds.get("user_type") == 1) {
            this.isAdmin = false;
            this.isFreelancer = true;
          } else {
            alert("");
          }
        });
    },
  
  async getUsername() {
      this.username = firebase.auth().currentUser.displayName;
    },
  },

  mounted() {
    this.$nextTick(this.getUsername);
    this.$nextTick(this.profileType);
  },

  beforeUpdate() {
    this.$nextTick(this.getUsername);
    this.$nextTick(this.profileType);
  },

  updated() {
    this.$nextTick(this.getUsername);
    this.$nextTick(this.profileType);
  },

  data() {
    return {
      username: "error",
      isAdmin: false,
      isFreelancer: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");
.introduction{
  border-width: 0px;
  font-family: 'Ubuntu';
  font-weight: lighter;
  font-size: 25px;
  margin-left: 3%;
  margin-top: 1%;
  color: rgb(168, 168, 168);
}
.get-started-button{
  border-width: 0px;
  width: 25%;
  max-width: 350px;
  min-width: 300px;
  border-radius: 7px;
  background-color: rgb(0, 52, 89);
  border-color:rgb(0, 52, 89);
  font-family: 'Ubuntu';
  font-weight: lighter;
  color: rgb(255,255,255);
  text-align: center;
  font-size: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 2%;
  min-height: 400px;
  position: relative;
  display: inline-block !important;
}

.get-started{
  width: 500px; 
  margin:  0px auto;
  display: flex;
  justify-content: center;
  border-width: 0cm;
  margin-bottom: 10%;
}

.page-transfer{
  margin-left: 0%;
  transform: translate(-50%, 0);
  max-width: 300px;
  width: 80%;
  padding: 15px, 15px, 15px, 15px;
  height: 40px;
  background-color: rgb(0, 89, 128);
  color:rgb(255,255,255);
  text-align: center;
  position: absolute;
  bottom: 25px;
}
</style>