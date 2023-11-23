<template>
  <div id="app">
    <FileUpload />
  </div>
</template>

<script>
import FileUpload from "@/components/FileUpload.vue";

export default {
  name: "App",
  components: {
    FileUpload,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>