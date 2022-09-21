<script setup lang="ts">
import { ref } from "vue";
const text = ref("");
</script>

<template>
  <div class="searchBarArea">
    <q-input
      bg-color="grey-5"
      class="searchBar"
      rounded
      standout
      v-model="text"
      placeholder="Search Challenges"
    >
    </q-input>
  </div>
</template>

<style>
.searchBar {
  height: 37px;
  width: 600px;
  border-radius: 5px;
  padding-left: 35px;
}

.searchBarArea {
  margin-left: -495px;
  max-width: 500px;
  display: inline-block;
}
</style>
