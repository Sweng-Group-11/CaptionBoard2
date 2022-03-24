<template>


  <v-row justify="center">
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>Storyboard Name</v-expansion-panel-header>
        <v-expansion-panel-content>
          Company names
          Insert Description
          Thumbnail image
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>


</template>

<script>


</script>




<style scoped>

</style>