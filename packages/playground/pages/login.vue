<template>
  <div class="grid">
    <UiCard>
      <h1>Emails</h1>
      <ul>
        <li v-for="(email, id) in emails" :key="id">
          {{ email }}
        </li>
      </ul>
    </UiCard>
    <UiCard class="grid-column">
      <h1>Add Email</h1>
      <UiTextField v-model="email"></UiTextField>
      <UiBtn color="red" @click="addEmail">Add Email</UiBtn>
    </UiCard>
  </div>
</template>

<script lang="ts">
export default definePage({
  asyncData({ $accessor }) {
    const emails = $accessor.getEmails;

    return {
      emails,
    };
  },
  data() {
    return {
      email: "" as string,
    };
  },
  methods: {
    addEmail() {
      if (!this.email) return;
      this.$accessor.addEmail(this.email);
      this.email = "";
    },
  },
});
</script>

<style>
.grid {
  display: flex;
  flex-direction: row;
}

.grid-column {
  display: flex;
  flex-direction: column;
}
</style>
