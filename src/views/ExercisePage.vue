<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useChallengeStore } from "../stores/challenge";

const useChallenge = useChallengeStore();
const route = useRoute();
const title = route.params.title;
useChallenge.setChallenge();
useChallenge.getChallenge(title);
const isComplete = ref(false);

/**
 * Toggles completion status of challenge
 * @param completionStatus status
 */
function toggleCompletion(completionStatus: boolean) {
  isComplete.value = !isComplete;
  useChallenge.setStatus(isComplete);
}
</script>

<template>
  <!-- Challenge image -->
  <q-img fit:cover id="headerSection">
    <h1 id="challengeTitle">{{ useChallenge.name[0] }}</h1>
  </q-img>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-card dark bordered id="infoBox">
      <div>
        <!-- Description, Time limit, and Difficulty -->
        <div
          class="description"
          style="
            margin-top: 25px;
            margin-left: 25px;
            font-weight: bold;
            width: 950px;
          "
        >
          <q-card-section>
            {{ useChallenge.description[0] }}
          </q-card-section>
          <q-card-section>
            Categories:
            <span style="color: #2e9cca"
              >{{ useChallenge.categories[0] }}
            </span>
          </q-card-section>

          <q-card-section>
            <span
              >Time Limit:
              <span style="color: black">{{
                useChallenge.timeLimit[0]
              }}</span></span
            >
            <span style="margin-left: 15px"
              >Difficulty:
              <span style="color: black">{{
                useChallenge.difficulty[0]
              }}</span></span
            >
          </q-card-section>

          <q-card-section>
            <span
              ><q-btn
                id="completeBtn"
                :style="{ 'background-color': isComplete ? '#2e9cca' : '' }"
                @click="isComplete = !isComplete"
                >{{ isComplete ? "Complete" : "Mark as Complete" }}</q-btn
              ></span
            >
            <!-- create v-if here for displaying start or continue btn -->
            <q-btn class="statusBtn">Start</q-btn>
          </q-card-section>
        </div>
      </div>
    </q-card>
  </div>
</template>

<style>
#challengeTitle {
  color: #2e9cca;
  text-align: left;
  margin-left: 260px;
  margin-top: 140px;
  font-size: 40px;
  font-weight: bold;
}

#infoBox {
  width: 1000px;
  height: 380px;
  margin-left: 250px;
  margin-right: 150px;
  margin-top: 20px;
  background-color: #464866;
  border-radius: 10px;
}

#headerSection {
  background-color: #29648a;
  margin-bottom: 20px;
  max-width: 8000px;
  height: 240px;
  margin-top: -25px;
}

.statusBtn {
  background-color: green;
  color: black;
}

#completeBtn {
  background-color: #797373;
  color: black;
  font-weight: bold;
  font-size: 13px;
  width: 185px;
  height: 35px;
  left: 115px;
  top: 18px;
  position: absolute;
}
</style>
