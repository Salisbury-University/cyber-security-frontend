<script setup lang="ts">
import { useChallengeStore } from "../stores/challenge";

const useChallenge = useChallengeStore();
//useChallenge.resetState();
useChallenge.setChallenge();

// arr for storing challenge info
// const challengeItems: {
//   challengeName: string;
//   timeLimit: number;
//   difficulty: number;
//   description: string;
//   image: string;
// }[] = [];

const exerciseLength = useChallenge.name.length;

// loop through and store challenges in challengeItems arr
// while (i < exerciseLength) {
//   useChallenge.push({
//     challengeName: useChallenge.persistence.name[i],
//     timeLimit: useChallenge.persistence.timeLimit[i],
//     difficulty: useChallenge.persistence.difficulty[i],
//     description: useChallenge.persistence.description[i],
//     image: useChallenge.persistence.image[i],
//   });
//   i++;
// }

console.log(exerciseLength);
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
  <ul>
    <li v-for="index in exerciseLength" :key="index">
      <div class="container">
        <h1>{{ index }}</h1>

        <!-- Put image of challenge category here -->
        <q-img width="150px" src="{{ useChallenge.image[index] }}" />

        <span style="margin-left: 50px">
          <p id="challengeName">{{ useChallenge.name[index] }}</p>
          <p id="difficulty">
            Difficulty: {{ useChallenge.difficulty[index] }}
          </p>
          <p id="description">{{ useChallenge.description[index] }}</p>
        </span>

        <!-- Start or Continue btn based on completion here -->
      </div>
    </li>
  </ul>
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

#description {
  color: #aaabb8;
  margin-top: -40px;
  font-size: 18px;
  text-align: left;
}

.container {
  display: flex;
  margin-left: 310px;
  margin-top: 50px;
}

#challengeName {
  color: #2e9cca;
  font-size: 30px;
  margin-bottom: 40px;
  margin-top: 50px;
  font-weight: bold;
}

#difficulty {
  text-align: left;
  font-size: 18px;
  margin-bottom: 55px;
  margin-top: -30px;
  color: #464866;
}
</style>
