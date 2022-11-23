<template>
  <div>AppBar</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "AppBar",
  props: {
    position: {
      type: String as PropType<"top" | "bottom">,
      required: true,
    },
  },
});
</script>
