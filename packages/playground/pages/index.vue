<template>
  <div class="grid">
    <UiCardImg :src="imageUrl" alt="Cat" elevated>
      <h1>Cat Fact</h1>
      <p>{{ catFact.fact }}</p>
      <UiBtn color="red" @click="showLazyCard = true">Show LazyUiCard</UiBtn>
    </UiCardImg>
    <UiCardImg :src="imageUrl" alt="Cat" v-if="showLazyCard">
      <h1>LazyCard</h1>
      <p>{{ catFact.fact }}</p>
      <UiBtn color="red" @click="getNewFact">Get New Fact</UiBtn>
    </UiCardImg>

    <n-link to="/login">Click Me</n-link>
  </div>
</template>

<script lang="ts">
export default definePage({
  layout: "auth",
  middleware: ["auth"],
  async asyncData({ $plugins, $accessor }) {
    const fact = await $plugins.$catFact();
    return {
      imageUrl: "https://cdn.mos.cms.futurecdn.net/Xm5tNGu2r7gT9WzeXqd8S9.jpg",
      catFact: fact,
    };
  },
  data() {
    return {
      showLazyCard: false,
    };
  },
  methods: {
    async getNewFact() {
      await this.$nuxt.refresh();
    },
  },
});
</script>
