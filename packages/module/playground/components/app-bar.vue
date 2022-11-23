<template>
  <div>AppBar</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AppBar",
  props: {
    app: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>
