<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
  
    <!-- Thumbnail Image-->
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Name of Storyboard
    </v-card-title>

    <v-card-subtitle>
      Company Name
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="blue lighten-2"
        text
      >
        View Storyboard
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

    <!--Quick Description -->
        <v-card-text>
            Quick Description of Storyboard
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>


<script>
  export default {
    data: () => ({
      show: false,
    }),
  }
</script>