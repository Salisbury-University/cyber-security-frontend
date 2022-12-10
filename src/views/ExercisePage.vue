<script setup lang="ts">
import { useRoute } from "vue-router";
import { useChallengeStore } from "../stores/challenge";

const useChallenge = useChallengeStore();
const route = useRoute();
const title = route.params.title;
useChallenge.setChallenge();
useChallenge.getChallenge(title);
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
            Time Limit:
            <span style="color: black">{{ useChallenge.timeLimit[0] }}</span>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Difficulty:
            <span style="color: black">{{ useChallenge.difficulty[0] }} </span>
          </q-card-section>

          <q-card-section>
            <span
              ><q-btn id="vmBtn"
                >Launch VM<q-icon name="settings" style="left: 6px" /></q-btn
            ></span>
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
  color: white;
}

#vmBtn {
  background-color: #797373;
  color: black;
  font-weight: bold;
  font-size: 13px;
  width: 145px;
  left: 115px;
  top: 20px;
  position: absolute;
}
</style>
