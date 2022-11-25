<template>
  <input :value="value" @input="handleInput" class="input" type="text" />
</template>

<script lang="ts">
export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      default: "",
    },
  },
  methods: {
    handleInput(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit("input", target.value);
    },
  },
});
</script>

<style scoped>
.input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
}
</style>
