<template>
  <div :class="cardClass" :style="{ width: width }">
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "UiCard",
  props: {
    elevated: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    width: {
      type: String as PropType<string>,
      default: "300px",
    },
  },
  computed: {
    cardClass(): object {
      return {
        card: true,
        "card--elevated": this.elevated,
      };
    },
  },
  emits: {
    shaiko: (value: string) => true,
  },
});
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 4px;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}

.card--elevated {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
