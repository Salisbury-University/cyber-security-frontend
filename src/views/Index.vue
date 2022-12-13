<script setup lang="ts">
import { useChallengeStore } from "../stores/challenge";
import { useAuthStore } from "../stores/auth";
import Card from "../components/Card.vue";
import { ref } from "vue";
import LandingCard from "../components/LandingCard.vue";

const useAuth = useAuthStore();
const useChallenge = useChallengeStore();

const date = ref(new Date().toLocaleDateString());
const time = ref(new Date().toLocaleTimeString());

// Dynamic clock
setInterval(() => {
  time.value = new Date().toLocaleTimeString();
  date.value = new Date().toLocaleDateString();
}, 1000);

useChallenge.getWeekly();
const weekly = useChallenge.persistence.weekly;
</script>

<template>
  <q-page-container>
    <q-page padding>
      <div id="dynamic-time">
        <span class="date">{{ date }}</span>
        <span class="time">{{ time }}</span>
      </div>

      <div id="most-stats" v-if="useChallenge.persistence.weekly">
        <LandingCard
          title="Most Valuable User"
          :message="'' + useChallenge.persistence.weekly.user.name"
          :count="useChallenge.persistence.weekly.user.number"
        ></LandingCard>
        <LandingCard
          title="Most started exercise"
          :message="'' + useChallenge.persistence.weekly.exerciseTitle.name"
          :count="useChallenge.persistence.weekly.exerciseTitle.number"
        ></LandingCard>
        <LandingCard
          title="Most category"
          :message="'' + useChallenge.persistence.weekly.category.name"
          :count="useChallenge.persistence.weekly.category.number"
        ></LandingCard>
        <LandingCard
          title="Most difficulty"
          :message="'' + useChallenge.persistence.weekly.difficulty.name"
          :count="useChallenge.persistence.weekly.difficulty.number"
        ></LandingCard>
      </div>
    </q-page>
    <router-view />
  </q-page-container>
</template>

<style>
#dynamic-time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--q-accent);
}
.date {
  font-size: 2rem;
  font-weight: bolder;
}
.time {
  font-size: 1.2rem;
}

.q-card {
  width: 300px;
  margin: 20px;
}

#most-stats {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
