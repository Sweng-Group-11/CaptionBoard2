<template>
    <div>
        <span>This is the add new storyboards page</span>
        <v-btn raised class="primary" @click="onPickFile">upload image</v-btn>
        <input type="file" style="display:none" ref="fileInput" accept="image/*">
    </div>

</template>


<script>
    export default {
        methods:    {
            onPickFile(){
                this.$refs.fileInput.click();
            }
        }
    }
</script>




<style scoped>

</style>