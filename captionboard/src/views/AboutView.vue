
<template>
  <div class="about">

  <H1>Team</H1>


 


  <v-container class="my-6">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-xs-center ma-2">
            <v-responsive class="pt-4">
              <v-icon large center>mdi-account-circle</v-icon>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left @click="go_to_github(person.github)">mdi-github</v-icon>
                <span class="">Github</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        
      </v-layout>

    </v-container>
 
 <v-container class="Links">
 
  </v-container>
 <v-btn href="https://github.com/Sweng-Group-11/CaptionBoard" target="_blank">Project Github</v-btn>
  <v-btn href="https://github.com/Sweng-Group-11/CaptionBoard">Team Github</v-btn>
  <v-img class="ma-2" src ="@/assets/github_logo.png" alt=""
    contain  
    height="50px"
    width="50px"></v-img>
 

<v-card
    flat class = "text-xs-center ma-3"
    shaped
  >
    <v-img
      src = "@/assets/adapt_logo.png"
      height="250px"   
    >
    <v-row align="end"
          class = "fill-height"
          >
          <v-col
              align-self="centre"
              class="ma-3"
              cols="12"  
            >
              <v-avatar
                  class="profile"
                  color="grey"
                  size="164"
                  
                
               >

            <v-img src="https://media-exp1.licdn.com/dms/image/C4D03AQGiUdS6Yu6FMg/profile-displayphoto-shrink_800_800/0/1614609270581?e=1654128000&v=beta&t=WxutPYTOke-8o2vJrOaY3rEN8w4YDEUIs_cZRttsmKw"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content>
              <v-list-item-title class="H1" align= "left" >
                M Al-Rawi
              </v-list-item-title>
              <v-list-item-subtitle>Researcher</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
                  
    <v-card-title>
      TCD Adapt
    </v-card-title>

    <v-card-subtitle>
      Our Client
    </v-card-subtitle>
    <v-list-item-text>The client of the project is Adapt TCD “pushing the frontiers of knowledge and bringing new solutions to societal and industrial challenges”.  This mission statement is exemplified in this project as we as students progress both our learning objectives and project objectives with the hope that the app will make a positive impact on the world.

ADAPT Research Centre primarily works with AI-Driven Digital Content and specifically Human Centric AI techniques and technologies including personalisation, natural processing, data analytics, and intelligent machine translation human-computer interaction.</v-list-item-text>

    <v-card-actions>
      <v-btn
        color="blue darken-4"
        text
        href="https://github.com/Sweng-Group-11/CaptionBoard" target="_blank"
      >
        Find Out More
      </v-btn>

      

      
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>


  

  
  

</div>

</template>



<script>
export default {
  methods:{
    go_to_github: function (username){
      window.open("https://github.com/"+username)
    }
  },
  data(){
    return {
      team: [
        { name: 'Matthew Dowse', role: 'Front End Lead', github:'MatthewDesmondDowse' },
        { name: 'Cian Doyle', role: 'Back End Lead', github:'ciandoyle251' },
        { name: 'Wesley Shaw', role: 'Back End Developer', github:'WesLemon' },
        { name: 'Laura Golec', role: 'Front End Developer', github: 'goleccc' },
        { name: 'Pranav Bollina', role: 'Front End Developer', github: 'BollinaPranav'},
        { name: 'Ross Donnelly', role: 'Client Comms and Documentation', github: 'rdonners'}
      ]
    }
  }
 
}
</script>