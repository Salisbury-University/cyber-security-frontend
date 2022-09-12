<script setup lang="ts">
import { useChallengeStore } from "../stores/challenge";

const useChallenge = useChallengeStore();
useChallenge.setChallenge();

// arr for storing challenge info
let challengeItems: {
  challengeName: string;
  timeLimit: number;
  difficulty: number;
  description: string;
  image: string;
}[] = [];

let i: number = 0;

// while(i < 3) {
//   challengeItems.push(useChallenge.getChallengeName());
//   challengeItems.push(useChallenge.getTimeLimit());
//   challengeItems.push(useChallenge.getDifficulty());
//   challengeItems.push(useChallenge.getDescription());
//   challengeItems.push(useChallenge.getImage());
//   i++;
// }
// console.log(challengeItems[0].challengeName);
</script>

<template>
  <h1 id="title">Challenges</h1>

  <!-- Challenge filters -->
  <q-btn class="filter" style="margin-right: 25px" label="Category">
    <q-menu></q-menu>
  </q-btn>

  <q-btn class="filter" style="margin-right: 25px" label="Difficulty">
    <q-menu>
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>Easy</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Medium</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Hard</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>

  <q-btn class="filter" label="Completed"></q-btn>

  <!-- Challenge list -->
  <div></div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Goldman");

#title {
  font-size: 45px;
  font-family: Goldman;
  color: #2e9cca;
  text-align: center;
  margin-top: -60px;
}

.filter {
  margin-right: 500px;
  background-color: #464866;
  color: #aaabb8;
}
</style>
