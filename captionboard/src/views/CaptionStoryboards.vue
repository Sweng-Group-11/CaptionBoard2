<template>
<div>
    <v-expansion-panels accordion>
        <v-expansion-panel v-for="(item, i) in 5" :key="i">
            <v-expansion-panel-header>Add Caption to + Storyboard Name</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div>Company name:</div>
                <div>Description:</div>
                <v-card max-width="344">
                    <!-- Thumbnail Image-->
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

                    <v-card-actions>
                        <div class="blue--text">
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col> 
                                            <v-text-field label="Insert caption here"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </div>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</div>
</template>

<script>
</script>

<style scoped>
</style>
