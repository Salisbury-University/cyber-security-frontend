<script setup lang="ts">
import { useChallengeStore } from "../stores/challenge";
import SearchBar from "../components/SearchBar.vue";
import { ref } from "vue";

const useChallenge = useChallengeStore();
useChallenge.setChallenge();

const challengeListSize = useChallenge.name.length;
const isFiltered = ref(false);
const easyFilter = ref(false);
const mediumFilter = ref(false);
const hardFilter = ref(false);

let searchText = ref("");

// function to signal that challenge list has been filtered
function filterChallengeList(input: string) {
  isFiltered.value = true;
  searchText.value = input;
}

// resets difficulty filters
function resetFilters() {
  easyFilter.value = false;
  mediumFilter.value = false;
  hardFilter.value = false;
}
</script>

<template>
  <h1 id="title">Challenges</h1>

  <!-- Challenge filters -->
  <q-btn-dropdown label="Category" class="filterOptMenu"> </q-btn-dropdown>

  <q-btn-dropdown label="Difficulty" class="filterOptMenu">
    <q-list>
      <q-item
        clickable
        v-close-popup
        class="text-green-5"
        @click="
          () => {
            resetFilters();
            easyFilter = !easyFilter;
          }
        "
      >
        <q-item-section>Easy</q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
        class="text-orange-7"
        @click="
          () => {
            resetFilters();
            mediumFilter = !mediumFilter;
          }
        "
      >
        <q-item-section>Medium</q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
        class="text-red-7"
        @click="
          () => {
            resetFilters();
            hardFilter = !hardFilter;
          }
        "
      >
        <q-item-section>Hard</q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>

  <q-btn class="filter" label="Completed"></q-btn>

  <!-- Search bar -->
  <SearchBar @applyChallengeFilter="filterChallengeList($event)" />

  <!-- Filtered Challenge list after search input-->
  <ul v-if="isFiltered">
    <div v-for="i in challengeListSize" :key="i">
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
          <p class="challengeName">{{ useChallenge.name[i - 1] }}</p>
          <p class="difficulty">
            Difficulty: {{ useChallenge.difficulty[i - 1] }}
          </p>
          <p class="description">{{ useChallenge.description[i - 1] }}</p>
        </span>

        <!-- Checkbox for completion of challenges here -->
      </div>
    </div>
  </ul>

  <div></div>

  <!-- Show easy challenges -->
  <ul v-if="easyFilter">
    <div v-for="easyIndex in challengeListSize" :key="easyIndex">
      <div v-if="useChallenge.difficulty[easyIndex - 1] < 4" class="container">
        <h1>{{ easyIndex }}</h1>

        <q-img width="150px" src="{{ useChallenge.image[easyIndex - 1] }}" />

        <span style="margin-left: 50px">
          <p class="challengeName">{{ useChallenge.name[easyIndex - 1] }}</p>
          <p class="difficulty">
            Difficulty: {{ useChallenge.difficulty[easyIndex - 1] }}
          </p>
          <p class="description">
            {{ useChallenge.description[easyIndex - 1] }}
          </p>
        </span>

        <!-- Checkbox for completion of challenges here -->
      </div>
    </div>
  </ul>

  <!-- Show medium challenges -->
  <ul v-else-if="mediumFilter">
    <div v-for="medIndex in challengeListSize" :key="medIndex">
      <div v-if="useChallenge.difficulty[medIndex - 1] == 4" class="container">
        <h1>{{ medIndex }}</h1>

        <q-img width="150px" src="{{ useChallenge.image[medIndex - 1] }}" />

        <span style="margin-left: 50px">
          <p class="challengeName">{{ useChallenge.name[medIndex - 1] }}</p>
          <p class="difficulty">
            Difficulty: {{ useChallenge.difficulty[medIndex - 1] }}
          </p>
          <p class="description">
            {{ useChallenge.description[medIndex - 1] }}
          </p>
        </span>

        <!-- Checkbox for completion of challenges here -->
      </div>
    </div>
  </ul>

  <!-- Show hard challenges -->
  <ul v-else-if="hardFilter">
    <div v-for="hardIndex in challengeListSize" :key="hardIndex">
      <div v-if="useChallenge.difficulty[hardIndex - 1] > 4" class="container">
        <h1>{{ hardIndex }}</h1>

        <q-img width="150px" src="{{ useChallenge.image[hardIndex - 1] }}" />

        <span style="margin-left: 50px">
          <p class="challengeName">{{ useChallenge.name[hardIndex - 1] }}</p>
          <p class="difficulty">
            Difficulty: {{ useChallenge.difficulty[hardIndex - 1] }}
          </p>
          <p class="description">
            {{ useChallenge.description[hardIndex - 1] }}
          </p>
        </span>

        <!-- Checkbox for completion of challenges here -->
      </div>
    </div>
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

        <!-- Checkbox for completion of challenges here -->
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

.filterOptMenu {
  background-color: #464866;
  color: #aaabb8;
  margin-right: 20px;
}
</style>
