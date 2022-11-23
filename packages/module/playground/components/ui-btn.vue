<template>
  <div>
    <button>Ui Button</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "UiBtn",
  props: {
    color: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>
