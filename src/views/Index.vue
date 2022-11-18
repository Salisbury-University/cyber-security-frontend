<script setup lang="ts">
import Card from "../components/Card.vue";
</script>

<template>
  <q-page-container>
    <q-page padding>
      <Card />
    </q-page>
    <router-view />
  </q-page-container>
</template>
