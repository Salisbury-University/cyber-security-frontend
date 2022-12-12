<script setup lang="ts">
import { useChallengeStore } from "../stores/challenge";

const useChallenge = useChallengeStore();
useChallenge.setChallenge();

// prop to store challenge index from challenges.vue
const props = defineProps({
  ["challengeIndex"]: {
    type: Number,
  },
});
</script>

<template>
  <div id="container">
    <!-- Challenge image -->
    <q-img
      id="img"
      :src="useChallenge.persistence.image[challengeIndex - 1]"
      loading="lazy"
    />

    <!-- Challenge Information (name, difficulty, description) -->
    <span style="margin-left: 50px">
      <p id="challengeName">
        <a
          :href="
            '/challenges/' + useChallenge.persistence.name[challengeIndex - 1]
          "
          >{{ useChallenge.persistence.name[challengeIndex - 1] }}</a
        >
      </p>
      <p id="difficulty">
        Difficulty:
        {{ useChallenge.persistence.difficulty[challengeIndex - 1] }}
      </p>
      <p class="description" style="margin-top: -40px">
        {{ useChallenge.persistence.briefDescription[challengeIndex - 1] }}
      </p>
    </span>
  </div>
</template>

<style>
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

.description {
  color: #aaabb8;
  font-size: 18px;
  text-align: left;
  width: 770px;
  word-wrap: break-word;
}

#difficulty {
  text-align: left;
  font-size: 18px;
  margin-bottom: 55px;
  margin-top: -30px;
  color: #464866;
}

#challengeName {
  color: #2e9cca;
  font-size: 30px;
  margin-bottom: 40px;
  margin-top: 50px;
  font-weight: bold;
  text-align: left;
}

#container {
  display: flex;
  margin-left: 310px;
  margin-top: 40px;
  margin-bottom: -50px;
}

#img {
  width: 200px;
  margin-bottom: 45px;
  border-radius: 8px;
  top: 45px;
}
</style>
