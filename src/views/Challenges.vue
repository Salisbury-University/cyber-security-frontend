<script setup lang="ts">
import { useChallengeStore } from "../stores/challenge";
import ChallengeItem from "../components/ChallengeItem.vue";
import SearchBar from "../components/SearchBar.vue";
import { ref } from "vue";

const useChallenge = useChallengeStore();
const filteredBySearch = ref(false);
const applyDiffFilter = ref(false);
const diffName = ref("");
const categoryName = ref("");
const val = ref(false);
let searchText = ref("");
useChallenge.setChallenge();

/**
 * Signals that challenge list has been filtered
 * @param input text from search bar
 */
function filterChallengeList(input: string) {
  filteredBySearch.value = true;
  searchText.value = input;
}

/**
 * Sets name of challenge difficulty
 * @param difficulty name of challenge difficulty
 */
function setDiffName(difficulty: string) {
  applyDiffFilter.value = true;
  filteredBySearch.value = false;
  diffName.value = difficulty;
}

/**
 * Sets the name of category selected
 * @param category category name
 */
function setCategory(category: string) {
  categoryName.value = category;
}

/**
 * Checks if category name is unique
 * @param category category name
 * @param index index in category list
 */
function isUnique(category: string, index: number) {
  for (let i = 0; i < index; i++) {
    for (let j = 0; j < useChallenge[i].length; j++) {
      if (useChallenge.categories[i][j] === category) return false;
    }
  }
  return true;
}
</script>

<template>
  <h1 id="title">Challenges</h1>

  <!-- Challenge filters -->
  <q-btn-dropdown label="Category" class="filterOptMenu">
    <div v-for="i in useChallenge.challengeListSize" :key="i">
      <div v-for="j in useChallenge[i - 1].length" :key="j">
        <q-list v-if="isUnique(useChallenge.categories[i - 1][j - 1], i - 1)">
          <q-item
            clickable
            v-close-popup
            style="color: #2e9cca"
            @click="setCategory(useChallenge.categories[i - 1][j - 1])"
            >{{ useChallenge.categories[i - 1][j - 1] }}</q-item
          >
        </q-list>
      </div>
    </div>
  </q-btn-dropdown>

  <q-btn-dropdown label="Difficulty" class="filterOptMenu">
    <q-list>
      <q-item
        clickable
        v-close-popup
        class="text-green-5"
        @click="setDiffName('Easy')"
      >
        <q-item-section>Easy</q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
        class="text-orange-7"
        @click="setDiffName('Medium')"
      >
        <q-item-section>Medium</q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
        class="text-red-7"
        @click="setDiffName('Hard')"
      >
        <q-item-section>Hard</q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>

  <q-btn class="filter" label="Completed"></q-btn>

  <!-- Search bar -->
  <SearchBar @applyChallengeFilter="filterChallengeList($event)" />

  <!-- Filtered Challenge list after search input-->
  <ul v-if="filteredBySearch">
    <div v-for="i in useChallenge.challengeListSize" :key="i">
      <div
        v-if="
          useChallenge.name[i - 1]
            .toLowerCase()
            .includes(searchText.toLowerCase()) && searchText
        "
      >
        <ChallengeItem :challengeIndex="i"></ChallengeItem>
      </div>
    </div>
  </ul>

  <!-- Show challegnes based on difficulty -->
  <ul v-else-if="applyDiffFilter">
    <div v-for="i in useChallenge.challengeListSize" :key="i">
      <div v-if="useChallenge.difficulty[i - 1].includes(diffName)">
        <ChallengeItem :challengeIndex="i"></ChallengeItem>
      </div>
    </div>
  </ul>

  <!-- Show challenges based on category-->
  <ul v-else-if="categoryName">
    <div v-for="i in useChallenge.challengeListSize" :key="i">
      <div v-for="j in useChallenge[i - 1].length" :key="j">
        <div
          v-if="useChallenge.categories[i - 1][j - 1].includes(categoryName)"
        >
          <ChallengeItem :challengeIndex="i"></ChallengeItem>
        </div>
      </div>
    </div>
  </ul>

  <!-- Default challenge list -->
  <ul v-else>
    <li v-for="i in useChallenge.challengeListSize" :key="i">
      <ChallengeItem :challengeIndex="i"></ChallengeItem>
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

.filterOptMenu {
  background-color: #464866;
  color: #aaabb8;
  margin-right: 20px;
}
</style>
