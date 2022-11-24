<template>
  <button :class="buttonClass" v-on="$listeners">
    <slot />
  </button>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    color: {
      type: String as PropType<"red" | "blue">,
      required: true,
    },
  },
  computed: {
    buttonClass(): object {
      return {
        button: true,
        "button--red": this.color === "red",
        "button--blue": this.color === "blue",
      };
    },
  },
});
</script>

<style scoped>
.button {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1rem;
  color: #fff;
  /* Remove the border */
  border: none;
  font-weight: bold;
  cursor: pointer;
  /** Add shadow */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.button--red {
  background-color: red;
}

.button--blue {
  background-color: blue;
}
</style>
