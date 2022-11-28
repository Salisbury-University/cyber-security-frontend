<script setup lang="ts">
import { useChallengeStore } from "../stores/challenge";

const useChallenge = useChallengeStore();
useChallenge.setChallenge();

const completionStatus = "Start";
</script>

<template>
  <!-- Challenge image -->
  <!--  src="https://placeimg.com/500/300/nature" -->
  <q-img
    src="https://placeimg.com/500/300/nature"
    fit:cover
    id="challengeImg"
    ratio="1"
  >
    <h1 id="challengeTitle">{{ useChallenge.name[0] }}</h1>
  </q-img>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-Card dark bordered id="infoBox">
      <div id="challengeInfo">
        <div class="description">
          <q-card-section> {{ useChallenge.description[0] }}</q-card-section>

          <!-- remove unecessary chars from challenge categories -->
          <q-card-section>
            Categories:
            <span style="color: #2e9cca">{{
              useChallenge.categories[0]
            }}</span></q-card-section
          >

          <q-card-section>
            Time Limit: {{ useChallenge.timeLimit[0] }}</q-card-section
          >
          <q-card-section>
            Difficulty: {{ useChallenge.difficulty[0] }}</q-card-section
          >
        </div>
      </div>

      <!-- change color of text based on difficulty -->

      <!-- create v-if here for displaying start or continue btn -->
      <q-btn style="background-color: green">{{ completionStatus }}</q-btn>
    </q-Card>
  </div>
</template>

<style>
#challengeTitle {
  color: #2e9cca;
  text-align: left;
  margin-left: 260px;
  margin-top: 140px;
  font-size: 40px;
}

#infoBox {
  width: 1000px;
  height: 680px;
  margin-left: 250px;
  margin-right: 150px;
  margin-top: 35px;
  background-color: #464866;
  border-radius: 10px;
}

#challengeInfo {
  text-align: left;
}

#challengeImg {
  background-color: #464866;
  margin-bottom: 20px;
  max-width: 8000px;
  height: 240px;
  margin-top: -25px;
}
</style>
