<script setup lang="ts">
import Card from "../components/Card.vue";
import noVNC from "../components/noVNC.vue";
</script>

<template>
  <q-page-container>
    <q-page padding>
      <Card />
      <noVNC />
    </q-page>
    <router-view />
  </q-page-container>
</template>
