 <template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="(item, i) in 5" :key="i">
      <v-expansion-panel-header>
        Completed + Storyboard Name
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card max-width="344">
          <!-- Thumbnail Image-->
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-actions>
            <div class="blue--text">Your Caption for this Image</div>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>

        <!-- Insert Images -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {};
</script> 