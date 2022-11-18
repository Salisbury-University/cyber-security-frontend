<script setup lang="ts">
// prop to store individual challenge information
const props = defineProps({
  name: String,
  description: String,
  difficulty: Number,
  image: String,
});
</script>

<template>
  <div>
    <!-- Challenge image -->
    <!-- <q-img
      fit:cover
      src="https://placeimg.com/500/300/nature"
      style="max-width: 800px; height: 150px"
    >
    </q-img> -->

    <h1 id="challengeTitle">{{ $route.params.title }}</h1>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-Card dark bordered id="infoBox">
        <div id="challengeInfo">
          <q-card-section> Description text here </q-card-section>

          <q-card-section> Categories here </q-card-section>

          <q-card-section> Time Limit and difficulty here </q-card-section>
        </div>

        <q-btn>Start or Continue btn</q-btn>
      </q-Card>
    </div>
  </div>
</template>

<style>
#challengeTitle {
  color: #2e9cca;
  text-align: left;
  margin-left: 260px;
  margin-top: -25px;
  font-size: 50px;
}

#infoBox {
  width: 950px;
  height: 680px;
  margin-left: 250px;
  margin-top: -20px;
  background-color: #d9d9d9;
  border-radius: 10px;
}

#challengeInfo {
  text-align: left;
}
</style>
