<script setup lang="ts">
import { useChallengeStore } from "../stores/challenge";
import SearchBar from "../components/SearchBar.vue";
import { ref } from "vue";

const useChallenge = useChallengeStore();
useChallenge.setChallenge();

const challengeListSize = useChallenge.name.length;
const isFiltered = ref(false);

let searchText = ref("");

// const results: {
//   Name: string,
//   Image: string,
//   Difficulty: number,
//   Description: string
// }[] = [];

// function signal that challenge list has been filtered
function filterChallengeList(input: string) {
  isFiltered.value = true;
  searchText.value = input;
}
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

  <!-- Search bar -->
  <SearchBar @applyFilter="filterChallengeList($event)" />

  <!-- Filtered Challenge list after search-->
  <ul v-if="isFiltered">
    <li v-for="i in challengeListSize" :key="i">
      <div
        v-if="
          useChallenge.name[i - 1]
            .toLowerCase()
            .includes(searchText.toLowerCase())
        "
        class="container"
      >
        <h1>{{ i }}</h1>

        <q-img width="150px" src="{{ useChallenge.image[i - 1] }}" />

        <span style="margin-left: 50px">
          <p class="challengeName">{{ useChallenge.name[i - 1] }}</p>
          <p class="difficulty">
            Difficulty: {{ useChallenge.difficulty[i - 1] }}
          </p>
          <p class="description">{{ useChallenge.description[i - 1] }}</p>
        </span>
      </div>
    </li>
  </ul>

  <!-- Default challenge list -->
  <ul v-else>
    <li v-for="index in challengeListSize" :key="index">
      <div class="container">
        <h1>{{ index }}</h1>

        <!-- Challenge image -->
        <q-img width="150px" src="{{ useChallenge.image[index - 1] }}" />

        <!-- Challenge description and difficulty -->
        <span style="margin-left: 50px">
          <p class="challengeName">{{ useChallenge.name[index - 1] }}</p>
          <p class="difficulty">
            Difficulty: {{ useChallenge.difficulty[index - 1] }}
          </p>
          <p class="description">{{ useChallenge.description[index - 1] }}</p>
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

.description {
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

.challengeName {
  color: #2e9cca;
  font-size: 30px;
  margin-bottom: 40px;
  margin-top: 50px;
  font-weight: bold;
}

.difficulty {
  text-align: left;
  font-size: 18px;
  margin-bottom: 55px;
  margin-top: -30px;
  color: #464866;
}
</style>
