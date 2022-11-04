<script setup lang="ts">
import { useChallengeStore } from "../stores/challenge";
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

// function to signal that challenge list has been filtered
function filterChallengeList(input: string) {
  filteredBySearch.value = true;
  searchText.value = input;
}

// set name of difficulty (easy, medium, hard)
function setDiffName(difficulty: string) {
  applyDiffFilter.value = true;
  filteredBySearch.value = false;
  diffName.value = difficulty;
}

// set the name of category selected
function setCategory(category: string) {
  categoryName.value = category;
}
</script>

<template>
  <h1 id="title">Challenges</h1>

  <!-- Challenge filters -->
  <q-btn-dropdown label="Category" class="filterOptMenu">
    <q-list v-for="i in 3" :key="i">
      <q-item
        clickable
        v-close-popup
        style="color: #2e9cca"
        @click="setCategory(useChallenge.categories[0][i - 1])"
        >{{ useChallenge.categories[0][i - 1] }}</q-item
      >
    </q-list>
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
        class="container"
      >
        <h1>{{ i }}</h1>

        <q-img width="150px" src="{{ useChallenge.image[i - 1] }}" />

        <span style="margin-left: 50px">
          <p class="challengeName">
            <a href="">{{ useChallenge.name[i - 1] }}</a>
          </p>
          <p class="difficulty">
            Difficulty: {{ useChallenge.difficulty[i - 1] }}
          </p>
          <p class="description">{{ useChallenge.description[i - 1] }}</p>
        </span>
      </div>
    </div>
  </ul>

  <!-- Show challegnes based on difficulty -->
  <ul v-else-if="applyDiffFilter">
    <div v-for="i in useChallenge.challengeListSize" :key="i">
      <div
        v-if="useChallenge.difficulty[i - 1].includes(diffName)"
        class="container"
      >
        <h1>{{ i }}</h1>

        <q-img width="150px" src="{{ useChallenge.image[i - 1] }}" />

        <span style="margin-left: 50px">
          <p class="challengeName">
            <a href="">{{ useChallenge.name[i - 1] }}</a>
          </p>
          <p class="difficulty">
            Difficulty: {{ useChallenge.difficulty[i - 1] }}
          </p>
          <p class="description">
            {{ useChallenge.description[i - 1] }}
          </p>
        </span>
      </div>
    </div>
  </ul>

  <!-- Show challenges based on category-->
  <ul v-else-if="categoryName">
    <div v-for="i in 3" :key="i">
      <div v-for="j in 3" :key="j">
        <div
          v-if="useChallenge.categories[i][j - 1].includes(categoryName)"
          class="container"
        >
          <h1>{{ i }}</h1>

          <q-img width="150px" src="{{ useChallenge.image[i - 1] }}" />

          <span style="margin-left: 50px">
            <p class="challengeName">
              <a href="">{{ useChallenge.name[i - 1] }}</a>
            </p>
            <p class="difficulty">
              Difficulty: {{ useChallenge.difficulty[i - 1] }}
            </p>
            <p class="description">
              {{ useChallenge.description[i - 1] }}
            </p>
          </span>
        </div>
      </div>
    </div>
  </ul>

  <!-- Default challenge list -->
  <ul v-else>
    <li v-for="i in useChallenge.challengeListSize" :key="i">
      <div class="container">
        <h1>{{ i }}</h1>

        <!-- Challenge image -->
        <q-img width="150px" src="{{ useChallenge.image[i - 1] }}" />

        <!-- Challenge description and difficulty -->
        <span style="margin-left: 50px">
          <p class="challengeName">
            <a href="/challeneges/">{{ useChallenge.name[i - 1] }}</a>
          </p>
          <p class="difficulty">
            Difficulty: {{ useChallenge.difficulty[i - 1] }}
          </p>
          <p class="description">{{ useChallenge.description[i - 1] }}</p>
        </span>
      </div>
    </li>
  </ul>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Goldman");

a {
  text-decoration: none;
  color: #2e9cca;
  position: relative;
}

a:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  border-bottom: 2px solid #2e9cca;
  transition: 0.4s;
}

a:hover:after {
  width: 100%;
}

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
  margin-top: 40px;
  margin-bottom: -50px;
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

.filterOptMenu {
  background-color: #464866;
  color: #aaabb8;
  margin-right: 20px;
}
</style>
