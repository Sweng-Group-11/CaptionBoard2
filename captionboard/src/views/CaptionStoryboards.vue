<template>
  <div>
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header>Storyboard Name</v-expansion-panel-header>
        <v-expansion-panel-content>
          Company names Insert Description Thumbnail image

          <v-btn elevation="2"> Go to Caption this Storyboard </v-btn>

          <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Regular"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </div>
</template>

<script>
</script>




<style scoped>
</style>