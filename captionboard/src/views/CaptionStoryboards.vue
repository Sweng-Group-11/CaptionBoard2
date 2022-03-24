<template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="(item, i) in 5" :key="i">
      <v-expansion-panel-header>Storyboard Name</v-expansion-panel-header>
      <v-expansion-panel-content>
        Company names Insert Description Thumbnail image

        <v-btn elevation="2"> Go to Caption this Storyboard </v-btn>
        
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
</script>




<style scoped>
</style>