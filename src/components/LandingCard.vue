<script setup lang="ts">
const props = defineProps({
  ["title"]: {
    type: String,
  },
  ["message"]: {
    type: String,
  },
  ["count"]: {
    type: Number,
  },
});
</script>
<template>
  <q-card>
    <q-card-section>
      <span class="title">{{ title }}</span>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <span class="message">{{ message }}</span>
    </q-card-section>
    <q-card-section v-if="count !== undefined">
      <span>Number of Times: </span>
      <span class="counter">{{ count }}</span>
    </q-card-section>
  </q-card>
</template>
