<template>
  <div>
    <h1>Index Page !</h1>
    <AppBar position="top"></AppBar>
    <UiBtn color="red"></UiBtn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IndexPage",
  async asyncData({ $plugins }) {
    const catFact = await $plugins.$catFact();
    console.log(catFact.fact);
  },
  mounted() {
    this.$sayStuff("Mounted !");
  },
});
</script>
