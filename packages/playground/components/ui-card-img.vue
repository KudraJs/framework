<template>
  <UiCard v-bind="[$attrs, $props]" v-on="$listeners">
    <img :src="src" :alt="alt" class="card-img__img" />
    <slot />
  </UiCard>
</template>

<script lang="ts">
import UiCard from "~/components/ui-card.vue";
export default defineComponent({
  extends: UiCard,
  props: {
    src: {
      type: String as PropType<string>,
      required: true,
    },
    alt: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<style scoped>
.card-img__img {
  width: 100%;
  height: auto;
}
</style>
