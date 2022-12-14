<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useChallengeStore } from "../stores/challenge";

const useChallenge = useChallengeStore();
const useAuth = useAuthStore();
const route = useRoute();
const title = route.params.title;
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
    <h1 id="challengeTitle">{{ useChallenge.persistence.name[0] }}</h1>
  </q-img>

  <div class="q-pa-md col items-start q-gutter-md exerciseLayout">
    <q-card dark bordered id="infoBox">
      <div>
        <!-- Description, Time limit, and Difficulty -->
        <div class="description" style="
            margin-top: 25px;
            margin-left: 25px;
            font-weight: bold;
            width: 950px;
          ">
          <q-card-section>
            {{ useChallenge.persistence.description[0] }}
          </q-card-section>
          <q-card-section>
            Categories:
            <span style="color: #2e9cca">{{ useChallenge.persistence.categories[0] }}
            </span>
          </q-card-section>

          <q-card-section>
            <span>Time Limit:
              <span style="color: black">{{
                  useChallenge.persistence.timeLimit[0]
              }}</span></span>
            <span style="margin-left: 15px">Difficulty:
              <span style="color: black">{{
                  useChallenge.persistence.difficulty[0]
              }}</span></span>
          </q-card-section>

          <q-card-section>
            <!-- Enable/Disable start btn based on login status -->
            <q-btn class="statusBtn" @click="async ()=>{await useChallenge.startVM(useChallenge.persistence.name[0])}"
              :disable="!useAuth.persistence.loginStatus">Start</q-btn>

              <q-btn class="statusBtn" @click="async ()=>{await useChallenge.stopVM(useChallenge.persistence.name[0])}"
              :disable="!useAuth.persistence.loginStatus">stop</q-btn>

              <q-btn id="completeBtn" :style="{ 'background-color': isComplete ? '#2e9cca' : '' }"
                :disable="!useAuth.persistence.loginStatus" @click="()=>{
                  useChallenge.postStatus(useChallenge.persistence.name[0]);
                  isComplete = !isComplete
                }">{{ isComplete ? "Complete"
                    : "Mark as Complete"
                }}</q-btn>
          </q-card-section>

        </div>
      </div>
    </q-card>
    <q-card
    style="background: transparent"
    class="contentBox"
    >
      <div class="">
        <q-card-section>

        </q-card-section>
        <q-card-section>
          <div v-html="useChallenge.persistence.content[0]"></div>
        </q-card-section>
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

#infoBox,
.contentBox {
  width: 1000px;
  height: 380px;
  /* margin-left: 250px;
  margin-right: 150px; */
  margin-top: 20px;
  background-color: #464866;
  border-radius: 10px;
}

.contentBox {
  height: auto;
  border-style: solid;
  text-align: start;
  padding: 100px;
  border-color: white;
}

.exerciseLayout {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 56px;
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
  margin-right: 20px;
}

#completeBtn {
  background-color: #797373;
  color: black;
  font-weight: bold;
  font-size: 13px;
  width: 185px;
  height: 35px;
}
</style>
